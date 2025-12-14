const bcrypt = require('bcryptjs');
const db = require('../db');

// GET /api/me
exports.getMe = (req, res) => {
  const userId = req.user.id;

  db.get(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    }
  );
};

// PUT /api/me
exports.updateMe = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, userId],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.json({ message: 'Profile updated successfully' });
    }
  );
};

// PUT /api/me/password
exports.changePassword = (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields required' });
  }

  db.get(
    'SELECT password FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const match = bcrypt.compareSync(currentPassword, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Wrong current password' });
      }

      const hashed = bcrypt.hashSync(newPassword, 10);

      db.run(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashed, userId],
        () => res.json({ message: 'Password updated successfully' })
      );
    }
  );
};

// DELETE /api/me
exports.deleteMe = (req, res) => {
  const userId = req.user.id;

  db.run(
    'DELETE FROM users WHERE id = ?',
    [userId],
    () => res.json({ message: 'Account deleted successfully' })
  );
};
