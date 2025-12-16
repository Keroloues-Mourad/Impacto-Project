const db = require('../db');

// GET /api/public/donations/:id
exports.getDonationById = (req, res) => {
  const id = req.params.id;

  db.get(
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
    WHERE d.id = ? AND d.status = 'Available'
    `,
    [id],
    (err, row) => {
      if (!row) {
        return res.status(404).json({ message: 'Donation not found' });
      }
      res.json(row);
    }
  );
};
