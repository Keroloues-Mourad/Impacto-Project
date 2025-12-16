const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const controller = require('../controllers/profile.controller');

router.get('/me', verifyToken, controller.getMyProfile);
router.put('/me', verifyToken, controller.updateMyProfile);
module.exports = router;
