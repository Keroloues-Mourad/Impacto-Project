const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/orders.controller');

router.post('/orders', verifyToken, (req, res, next) => {
  if (req.user.role !== 'customer' && req.user.role !== 'ngo') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.createOrder);


router.get('/orders/my', verifyToken, (req, res, next) => {
  if (req.user.role !== 'customer' && req.user.role !== 'ngo') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.getMyOrders);
module.exports = router;
