const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const controller = require('../controllers/donorDonations.controller');

/* GET MY DONATIONS */
router.get(
  '/donor/donations',
  verifyToken,
  requireRole('donor'),
  controller.getMyDonations
);

/* CREATE DONATION */
router.post(
  '/donor/donations',
  verifyToken,
  requireRole('donor'),
  upload.single('foodImage'),
  controller.createDonation
);

/* UPDATE DONATION */
router.put(
  '/donor/donations',
  verifyToken,
  requireRole('donor'),
  controller.updateDonation
);

/* DELETE DONATION */
router.delete(
  '/donor/donations/:id',
  verifyToken,
  requireRole('donor'),
  controller.deleteDonation
);

module.exports = router;
