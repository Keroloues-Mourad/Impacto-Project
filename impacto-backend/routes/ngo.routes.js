const express = require('express');
const router = express.Router();

const controller = require('../controllers/ngo.controller');
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// Dashboard
router.get(
  '/ngo/dashboard/stats',
  verifyToken,
  requireRole('ngo'),
  controller.getDashboardStats
);

// Available donations
router.get(
  '/ngo/donations/available',
  verifyToken,
  requireRole('ngo'),
  controller.getAvailableDonations
);

// Accept donation
router.post(
  '/ngo/donations/:id/accept',
  verifyToken,
  requireRole('ngo'),
  controller.acceptDonation
);

// ✅ Accepted donations
router.get(
  '/ngo/donations/accepted',
  verifyToken,
  requireRole('ngo'),
  controller.getAcceptedDonations
);

// ✅ Mark delivered
router.post(
  '/ngo/donations/:id/deliver',
  verifyToken,
  requireRole('ngo'),
  controller.markAsDelivered
);

module.exports = router;
