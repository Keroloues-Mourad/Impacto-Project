const db = require('../db');

// GET /api/admin/stats
exports.getStats = (req, res) => {
  const stats = {};

  db.get('SELECT COUNT(*) as count FROM donations', [], (err, row) => {
    stats.totalDonations = row ? row.count : 0;

    db.get('SELECT COUNT(*) as count FROM donations WHERE status = "Accepted"', [], (err, row) => {
      stats.lastOrders = row ? row.count : 0;

      db.get('SELECT COUNT(*) as count FROM ngos', [], (err, row) => {
        stats.totalNgos = row ? row.count : 0;

        db.get('SELECT COUNT(*) as count FROM couriers WHERE active = 1', [], (err, row) => {
          stats.activeCouriers = row ? row.count : 0;
          res.json(stats);
        });
      });
    });
  });
};

// GET /api/admin/recent-donations
exports.getRecentDonations = (req, res) => {
  db.all(
    `SELECT id, restaurant_name, food_type, quantity, status, created_at
     FROM donations
     ORDER BY created_at DESC
     LIMIT 5`,
    [],
    (err, rows) => {
      res.json(rows || []);
    }
  );
};
