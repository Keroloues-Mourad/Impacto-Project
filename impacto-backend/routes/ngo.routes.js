const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const controller = require('../controllers/ngo.controller');

// Get NGO Dashboard Stats
router.get(
  '/ngo/dashboard/stats',
  verifyToken,
  requireRole('ngo'),
  controller.getDashboardStats
);

// Get Available Donations
router.get(
  '/ngo/donations/available',
  verifyToken,
  requireRole('ngo'),
  controller.getAvailableDonations
);

// Accept Donation
router.post(
  '/ngo/donations/:id/accept',
  verifyToken,
  requireRole('ngo'),
  controller.acceptDonation
);

module.exports = router;
