const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const controller = require('../controllers/donorDashboard.controller');

/* Donor Dashboard */
router.get(
  '/donor/dashboard/stats',
  verifyToken,
  requireRole('donor'),
  controller.getDashboardStats
);

router.get(
  '/donor/dashboard/recent',
  verifyToken,
  requireRole('donor'),
  controller.getRecentDonations
);

module.exports = router;
