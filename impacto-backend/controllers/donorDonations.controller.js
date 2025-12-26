const db = require('../db');

/* ================= CREATE DONATION ================= */
exports.createDonation = (req, res) => {
  try {
    const { foodType, quantity, expiry } = req.body;
    const donorId = req.user.id;

    const image = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO donations
      (restaurant_id, food_type, quantity, expiry, image, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'Available', datetime('now'))
    `;

    const params = [
      donorId,
      foodType,
      quantity,
      expiry,
      image,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }

      res.status(201).json({
        message: 'Donation created successfully',
        donationId: this.lastID
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



/* ================= GET MY DONATIONS ================= */
exports.getMyDonations = (req, res) => {
  const donorId = req.user.id;

  const sql = `
    SELECT
      d.id,
      d.food_type,
      d.quantity,
      d.image,
      d.status,
      d.created_at,
      u.name AS ngo_name
    FROM donations d
    LEFT JOIN users u ON u.id = d.ngo_id
    WHERE d.restaurant_id = ?
    ORDER BY d.created_at DESC
  `;

  db.all(sql, [donorId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};

/* ================= UPDATE DONATION ================= */
exports.updateDonation = (req, res) => {
  const { donationId, food_type, quantity, expiry } = req.body;

  const sql = `
    UPDATE donations
    SET food_type = ?, quantity = ?, expiry = ?
    WHERE id = ?
  `;

  db.run(sql, [food_type, quantity, expiry, donationId], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Donation not updated' });
    }

    res.json({ message: 'Donation updated successfully' });
  });
};

/* ================= DELETE DONATION ================= */
exports.deleteDonation = (req, res) => {
  const donationId = req.params.id;

  const sql = `DELETE FROM donations WHERE id = ?`;

  db.run(sql, [donationId], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ message: 'Donation deleted successfully' });
  });
};
