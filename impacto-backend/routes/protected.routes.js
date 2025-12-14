const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');

// Admin only
router.get('/admin', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

// Donor only
router.get('/donor', verifyToken, requireRole('donor'), (req, res) => {
  res.json({ message: 'Welcome Donor' });
});

// NGO only
router.get('/ngo', verifyToken, requireRole('ngo'), (req, res) => {
  res.json({ message: 'Welcome NGO' });
});

// Customer only
router.get('/customer', verifyToken, requireRole('customer'), (req, res) => {
  res.json({ message: 'Welcome Customer' });
});

// Courier only
router.get('/courier', verifyToken, requireRole('courier'), (req, res) => {
  res.json({ message: 'Welcome Courier' });
});

module.exports = router;
