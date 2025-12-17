const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/courier.controller');

router.get('/courier/dashboard', verifyToken, (req, res, next) => {
  if (req.user.role !== 'courier') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.getDashboard);

router.get('/courier/available', verifyToken, (req, res, next) => {
  if (req.user.role !== 'courier') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.getAvailableDeliveries);

router.post('/courier/accept/:orderId', verifyToken, (req, res, next) => {
  if (req.user.role !== 'courier') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.acceptDelivery);

module.exports = router;
