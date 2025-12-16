const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const controller = require('../controllers/donorDonations.controller');

/* ================= GET MY DONATIONS ================= */
router.get(
  '/donor/donations',
  verifyToken,
  requireRole('donor'),
  controller.getMyDonations
);

/* ================= CREATE DONATION ================= */
router.post(
  '/donor/donations',
  verifyToken,
  requireRole('donor'),
  controller.createDonation
);




module.exports = router;
