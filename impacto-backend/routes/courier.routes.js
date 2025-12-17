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
router.get('/courier/accepted', verifyToken, (req, res, next) => {
  if (req.user.role !== 'courier') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.getAcceptedDeliveries);

router.post('/courier/delivered/:orderId', verifyToken, (req, res, next) => {
  if (req.user.role !== 'courier') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.markDelivered);

router.get('/courier/history', verifyToken, (req, res, next) => {
  if (req.user.role !== 'courier') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}, controller.getDeliveryHistory);

const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  '/courier/proof/:orderId',
  verifyToken,
  upload.single('proof'),
  (req, res, next) => {
    if (req.user.role !== 'courier') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  },
  controller.uploadProof
);

module.exports = router;
