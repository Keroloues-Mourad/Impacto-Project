const db = require('../db');

// GET /api/ngo/dashboard/stats
exports.getDashboardStats = (req, res) => {
  const ngoId = req.user.id;

  const sql = `
    SELECT
      (SELECT COUNT(*) FROM donations WHERE status = 'Available') AS available,
      (SELECT COUNT(*) FROM donations WHERE status = 'Accepted' AND ngo_id = ?) AS accepted,
      (SELECT COUNT(*) FROM donations WHERE status = 'Delivered' AND ngo_id = ?) AS delivered
  `;

  db.get(sql, [ngoId, ngoId], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
    res.json(row);
  });
};

// GET /api/ngo/donations/available
exports.getAvailableDonations = (req, res) => {
  const sql = `
    SELECT
      d.id,
      r.name AS restaurant,
      d.food_type,
      d.quantity,
      d.expiry
    FROM donations d
    LEFT JOIN restaurants r ON r.id = d.restaurant_id
    WHERE d.status = 'Available'
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};

// POST /api/ngo/donations/:id/accept
exports.acceptDonation = (req, res) => {
  const ngoId = req.user.id;
  const donationId = req.params.id;

  const sql = `
    UPDATE donations
    SET status = 'Accepted', ngo_id = ?
    WHERE id = ? AND status = 'Available'
  `;

  db.run(sql, [ngoId, donationId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Donation not available' });
    }

    res.json({ message: 'Donation accepted' });
  });
};
