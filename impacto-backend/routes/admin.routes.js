const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const controller = require('../controllers/admin.controller');

router.get('/admin/users', verifyToken, requireRole('admin'), controller.getAllUsers);
router.delete('/admin/users/:id', verifyToken, requireRole('admin'), controller.deleteUser);

module.exports = router;
