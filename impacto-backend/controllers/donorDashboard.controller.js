const db = require('../db');

/* ================= DONOR DASHBOARD STATS ================= */
exports.getDashboardStats = (req, res) => {
  const donorId = req.user.id;

  const sql = `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN status = 'Accepted' THEN 1 ELSE 0 END) AS accepted,
      SUM(CASE WHEN status = 'Delivered' THEN 1 ELSE 0 END) AS delivered
    FROM donations
    WHERE restaurant_id = ?
  `;

  db.get(sql, [donorId], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(row);
  });
};


/* ================= RECENT DONATIONS ================= */
exports.getRecentDonations = (req, res) => {
  const donorId = req.user.id;

  const sql = `
    SELECT
      d.id,
      d.food_type,
      d.quantity,
      d.status,
      d.created_at,
      u.name AS ngo_name
    FROM donations d
    LEFT JOIN users u ON u.id = d.ngo_id
    WHERE d.restaurant_id = ?
    ORDER BY d.created_at DESC
    LIMIT 5
  `;

  db.all(sql, [donorId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};
