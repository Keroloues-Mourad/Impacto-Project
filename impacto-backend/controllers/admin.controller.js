const db = require('../db');

// GET /api/admin/users
exports.getAllUsers = (req, res) => {
  db.all(
    'SELECT id, name, email, role, created_at FROM users',
    [],
    (err, users) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(users);
    }
  );
};

// DELETE /api/admin/users/:id
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  // Prevent admin from deleting himself
  if (parseInt(userId) === req.user.id) {
    return res.status(400).json({ message: 'Cannot delete your own account' });
  }

  db.run(
    'DELETE FROM users WHERE id = ?',
    [userId],
    function () {
      res.json({ message: 'User deleted successfully' });
    }
  );
};
