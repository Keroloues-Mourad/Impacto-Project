const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/publicDonations.controller');

router.get('/public/donations', verifyToken, (req, res, next) => {
  if (req.user.role !== 'customer' && req.user.role !== 'ngo') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.getAvailableDonations);

module.exports = router;
