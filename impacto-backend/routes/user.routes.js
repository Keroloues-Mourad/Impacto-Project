const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/user.controller');

router.get('/me', verifyToken, controller.getMe);
router.put('/me', verifyToken, controller.updateMe);
router.put('/me/password', verifyToken, controller.changePassword);
router.delete('/me', verifyToken, controller.deleteMe);

module.exports = router;
