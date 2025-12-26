const db = require('../db');

exports.getDonationById = (req, res) => {
  const donationId = req.params.id;

  const sql = `
    SELECT
      d.id,
      d.food_type,
      d.quantity,
      d.expiry,
      d.image,
      d.notes,
      u.name AS restaurant_name
    FROM donations d
    JOIN users u ON u.id = d.restaurant_id
    WHERE d.id = ?
  `;

  db.get(sql, [donationId], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(row);
  });
};
