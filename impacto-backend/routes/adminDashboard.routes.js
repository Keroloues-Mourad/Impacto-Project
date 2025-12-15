const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const controller = require('../controllers/adminDashboard.controller');

router.get('/admin/stats', verifyToken, requireRole('admin'), controller.getStats);
router.get('/admin/recent-donations', verifyToken, requireRole('admin'), controller.getRecentDonations);

module.exports = router;
