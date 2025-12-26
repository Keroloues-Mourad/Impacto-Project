const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/publicDonations.controller');

router.get(
  '/public/donations',
  verifyToken,
  controller.getAvailableDonations
);

module.exports = router;
