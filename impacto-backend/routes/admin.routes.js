const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');


function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
}

/* ================= DASHBOARD ================= */
router.get(
  '/admin/dashboard',
  verifyToken,
  adminOnly,
  adminController.getDashboard
);

/* ================= DONATIONS ================= */
router.get(
  '/admin/donations',
  verifyToken,
  adminOnly,
  adminController.getDonations
);

router.post(
  '/admin/donations/approve/:orderId',
  verifyToken,
  adminOnly,
  adminController.approveDonation
);
/* ================= USERS ================= */
router.get(
  '/admin/users',
  verifyToken,
  adminOnly,
  adminController.getUsers
);

router.delete(
  '/admin/users/:id',
  verifyToken,
  adminOnly,
  adminController.deleteUser
);
/* ================= NGOs ================= */
router.get(
  '/admin/ngos',
  verifyToken,
  adminOnly,
  adminController.getNgos
);

router.delete(
  '/admin/ngos/:id',
  verifyToken,
  adminOnly,
  adminController.deleteNgo
);
/* ================= RESTAURANTS ================= */
router.get(
  '/admin/restaurants',
  verifyToken,
  adminOnly,
  adminController.getRestaurants
);

router.delete(
  '/admin/restaurants/:id',
  verifyToken,
  adminOnly,
  adminController.deleteRestaurant
);

module.exports = router;
