const db = require('../db');

function getAvailableDonations(req, res) {
  db.all(
    `
    SELECT
      d.id,
      d.food_type,
      d.quantity,
      d.expiry,
      d.image,
      d.notes,
      d.created_at,
      u.name AS restaurant_name
    FROM donations d
    JOIN users u ON u.id = d.restaurant_id
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
}

module.exports = {
  getAvailableDonations
};
