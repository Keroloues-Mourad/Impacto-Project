const db = require('../db');

exports.getDashboard = (req, res) => {
  const data = {};

  db.serialize(() => {

    // Total donations
    db.get(
      `SELECT COUNT(*) AS count FROM donations`,
      (err, row) => {
        data.totalDonations = row?.count || 0;

        // Last orders
        db.get(
          `SELECT COUNT(*) AS count FROM orders`,
          (err, row) => {
            data.lastOrders = row?.count || 0;

           db.get(
              `SELECT COUNT(*) AS count FROM users WHERE role = 'ngo'`,
                 (err, row) => {
                    data.totalNgos = row?.count || 0;

                // Active couriers
                db.get(
                  `SELECT COUNT(*) AS count FROM users WHERE role = 'courier'`,
                  (err, row) => {
                    data.activeCouriers = row?.count || 0;

                    // Recent donations
                    db.all(
                      `
                      SELECT
                        d.id,
                        u.name AS restaurant,
                        d.food_type,
                        d.quantity,
                        d.status,
                        d.created_at
                      FROM donations d
                      JOIN users u ON d.restaurant_id = u.id
                      ORDER BY d.created_at DESC
                      LIMIT 5
                      `,
                      (err, rows) => {
                        data.recentDonations = rows || [];
                        res.json(data);
                      }
                    );
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
exports.getDonations = (req, res) => {
  db.all(
    `
    SELECT
      o.id AS order_id,
      d.food_type,
      o.quantity,
      o.status,
      o.created_at,
      u.name AS restaurant
    FROM orders o
    JOIN donations d ON o.donation_id = d.id
    JOIN users u ON d.restaurant_id = u.id
    ORDER BY o.created_at DESC
    `,
    (err, rows) => {
      if (err) {
        console.error('ADMIN DONATIONS ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

exports.approveDonation = (req, res) => {
  const orderId = req.params.orderId;

  db.run(
    `
    UPDATE orders
    SET status = 'Approved'
    WHERE id = ? AND status = 'Pending'
    `,
    [orderId],
    function (err) {
      if (err) {
        console.error('APPROVE ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to approve' });
      }

      if (this.changes === 0) {
        return res.status(400).json({ message: 'Already processed' });
      }

      res.json({ message: 'Donation approved' });
    }
  );
};
