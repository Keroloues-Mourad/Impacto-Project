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
exports.getUsers = (req, res) => {
  db.all(
    `
    SELECT id, name, email, role
    FROM users
    ORDER BY created_at DESC
    `,
    (err, rows) => {
      if (err) {
        console.error('GET USERS ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  db.run(
    `DELETE FROM users WHERE id = ?`,
    [userId],
    function (err) {
      if (err) {
        console.error('DELETE USER ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to delete user' });
      }

      res.json({ message: 'User deleted' });
    }
  );
};
exports.getNgos = (req, res) => {
  db.all(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      IFNULL(c.count, 0) AS accepted
    FROM users u
    LEFT JOIN (
      SELECT ngo_id, COUNT(*) AS count
      FROM donations
      WHERE status = 'Accepted'
      GROUP BY ngo_id
    ) c ON u.id = c.ngo_id
    WHERE u.role = 'ngo'
    ORDER BY u.created_at DESC
    `,
    (err, rows) => {
      if (err) {
        console.error('GET NGOS ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

exports.deleteNgo = (req, res) => {
  const id = req.params.id;

  db.run(
    `DELETE FROM users WHERE id = ? AND role = 'ngo'`,
    [id],
    function (err) {
      if (err) {
        console.error('DELETE NGO ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to delete NGO' });
      }
      res.json({ message: 'NGO deleted' });
    }
  );
};
exports.getRestaurants = (req, res) => {
  db.all(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      IFNULL(d.count, 0) AS donations
    FROM users u
    LEFT JOIN (
      SELECT restaurant_id, COUNT(*) AS count
      FROM donations
      GROUP BY restaurant_id
    ) d ON u.id = d.restaurant_id
    WHERE u.role = 'donor'
    ORDER BY u.created_at DESC
    `,
    (err, rows) => {
      if (err) {
        console.error('GET RESTAURANTS ERROR:', err.message);
        return res.status(500).json([]);
      }
      res.json(rows || []);
    }
  );
};

exports.deleteRestaurant = (req, res) => {
  const id = req.params.id;

  db.run(
    `DELETE FROM users WHERE id = ? AND role = 'donor'`,
    [id],
    function (err) {
      if (err) {
        console.error('DELETE RESTAURANT ERROR:', err.message);
        return res.status(500).json({ message: 'Failed to delete restaurant' });
      }
      res.json({ message: 'Restaurant deleted' });
    }
  );
};
