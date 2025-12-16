const db = require('../db');

// POST /api/orders
exports.createOrder = (req, res) => {
  const { donationId, quantity, phone, address } = req.body;
  const userId = req.user.id;

  if (!donationId || !quantity || !phone || !address) {
    return res.status(400).json({ message: 'Missing data' });
  }

  // Check donation
  db.get(
    'SELECT quantity FROM donations WHERE id = ? AND status = "Available"',
    [donationId],
    (err, donation) => {
      if (!donation || donation.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough quantity available' });
      }

      // Create order
      db.run(
        `
        INSERT INTO orders (customer_id, donation_id, quantity)
        VALUES (?, ?, ?)
        `,
        [userId, donationId, quantity],
        function () {
          // Reduce donation quantity
          db.run(
            'UPDATE donations SET quantity = quantity - ? WHERE id = ?',
            [quantity, donationId]
          );

          res.json({ orderId: this.lastID });
        }
      );
    }
  );
};
exports.getMyOrders = (req, res) => {
  const userId = req.user.id;

  db.all(
    `
    SELECT
      o.id,
      o.quantity,
      o.status,
      o.created_at,
      d.food_type
    FROM orders o
    JOIN donations d ON o.donation_id = d.id
    WHERE o.customer_id = ?
    ORDER BY o.created_at DESC
    `,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(rows);
    }
  );
};