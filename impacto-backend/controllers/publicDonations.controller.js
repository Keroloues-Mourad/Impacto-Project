const db = require('../db');

// GET /api/public/donations
exports.getAvailableDonations = (req, res) => {
  db.all(
    `
    SELECT
      d.id,
      d.food_type,
      d.quantity,
      d.expiry,
      d.created_at,
      u.name AS restaurant_name
    FROM donations d
    JOIN users u ON d.restaurant_id = u.id
    WHERE d.status = 'Available'
    ORDER BY d.created_at DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(rows);
    }
  );
};
