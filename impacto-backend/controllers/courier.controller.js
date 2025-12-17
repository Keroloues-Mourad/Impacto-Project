const db = require('../db');

exports.getDashboard = (req, res) => {
  const courierId = req.user.id;

  const result = {
    available: 0,
    accepted: 0,
    deliveredToday: 0,
    rating: 5,
    tasks: []
  };

  db.serialize(() => {

    // 1️⃣ Available deliveries
    db.get(
      `SELECT COUNT(*) AS count FROM orders WHERE status = 'Approved' AND courier_id IS NULL`,
      (err, row) => {
        if (err) {
          console.error('AVAILABLE ERROR:', err.message);
        } else {
          result.available = row?.count || 0;
        }

        // 2️⃣ Accepted by courier
        db.get(
          `SELECT COUNT(*) AS count FROM orders WHERE status = 'Accepted' AND courier_id = ?`,
          [courierId],
          (err, row) => {
            if (err) {
              console.error('ACCEPTED ERROR:', err.message);
            } else {
              result.accepted = row?.count || 0;
            }

            // 3️⃣ Delivered today
            db.get(
              `
              SELECT COUNT(*) AS count
              FROM orders
              WHERE status = 'Delivered'
                AND courier_id = ?
                AND DATE(created_at) = DATE('now')
              `,
              [courierId],
              (err, row) => {
                if (err) {
                  console.error('DELIVERED ERROR:', err.message);
                } else {
                  result.deliveredToday = row?.count || 0;
                }

                // 4️⃣ Current tasks
                db.all(
                  `
                  SELECT o.id, d.food_type
                  FROM orders o
                  JOIN donations d ON o.donation_id = d.id
                  WHERE o.status = 'Accepted'
                    AND o.courier_id = ?
                  `,
                  [courierId],
                  (err, rows) => {
                    if (err) {
                      console.error('TASKS ERROR:', err.message);
                    } else {
                      result.tasks = rows || [];
                    }

                    // ✅ FINAL RESPONSE (ALWAYS SAFE)
                    res.json(result);
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};
exports.getAvailableDeliveries = (req, res) => {
  db.all(
    `
    SELECT
      o.id,
      d.food_type,
      o.quantity,
      u.name AS restaurant
    FROM orders o
    JOIN donations d ON o.donation_id = d.id
    JOIN users u ON d.restaurant_id = u.id
    WHERE o.status = 'Approved'
      AND o.courier_id IS NULL
    `,
    (err, rows) => {
      if (err) {
        console.error('AVAILABLE LIST ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

exports.acceptDelivery = (req, res) => {
  const courierId = req.user.id;
  const orderId = req.params.orderId;

  db.run(
    `
    UPDATE orders
    SET status = 'Accepted', courier_id = ?
    WHERE id = ? AND courier_id IS NULL
    `,
    [courierId, orderId],
    function (err) {
      if (err) {
        console.error('ACCEPT ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to accept delivery' });
      }

      if (this.changes === 0) {
        return res.status(400).json({ message: 'Already accepted' });
      }

      res.json({ message: 'Delivery accepted' });
    }
  );
};
exports.getAcceptedDeliveries = (req, res) => {
  const courierId = req.user.id;

  db.all(
    `
    SELECT
      o.id,
      o.status,
      d.food_type,
      o.quantity,
      u.name AS restaurant
    FROM orders o
    JOIN donations d ON o.donation_id = d.id
    JOIN users u ON d.restaurant_id = u.id
    WHERE o.status = 'Accepted'
      AND o.courier_id = ?
    `,
    [courierId],
    (err, rows) => {
      if (err) {
        console.error('ACCEPTED LIST ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

exports.markDelivered = (req, res) => {
  const courierId = req.user.id;
  const orderId = req.params.orderId;

  db.run(
    `
    UPDATE orders
    SET status = 'Delivered'
    WHERE id = ? AND courier_id = ?
    `,
    [orderId, courierId],
    function (err) {
      if (err) {
        console.error('DELIVER ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to mark delivered' });
      }

      if (this.changes === 0) {
        return res.status(400).json({ message: 'Invalid delivery' });
      }

      res.json({ message: 'Delivery marked as delivered' });
    }
  );
};
exports.getDeliveryHistory = (req, res) => {
  const courierId = req.user.id;

  db.all(
    `
    SELECT
      o.id,
      o.quantity,
      o.created_at,
      o.proof_image,
      o.proof_notes,
      d.food_type,
      u.name AS restaurant
    FROM orders o
    JOIN donations d ON o.donation_id = d.id
    JOIN users u ON d.restaurant_id = u.id
    WHERE o.status = 'Delivered'
      AND o.courier_id = ?
    ORDER BY o.created_at DESC
    `,
    [courierId],
    (err, rows) => {
      if (err) {
        console.error('HISTORY ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

const path = require('path');
const fs = require('fs');

exports.uploadProof = (req, res) => {
  const courierId = req.user.id;
  const orderId = req.params.orderId;
  const notes = req.body.notes || null;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: 'Image required' });
  }

  db.run(
    `
    UPDATE orders
    SET
      proof_image = ?,
      proof_notes = ?,
      status = 'Delivered'
    WHERE id = ?
      AND courier_id = ?
    `,
    [image.filename, notes, orderId, courierId],
    function (err) {
      if (err) {
        console.error('UPLOAD ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to save proof' });
      }

      if (this.changes === 0) {
        return res.status(400).json({ message: 'Invalid delivery' });
      }

      res.json({ message: 'Delivery confirmed' });
    }
  );
};
