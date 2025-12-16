const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const controller = require('../controllers/donorDonations.controller');

router.post(
  '/donor/donations',
  verifyToken,
  requireRole('donor'),
  controller.createDonation
);

module.exports = router;
