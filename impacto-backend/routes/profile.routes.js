const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/profile.controller');

router.get('/profile', verifyToken, controller.getProfile);
router.put('/profile', verifyToken, controller.updateProfile);

module.exports = router;
