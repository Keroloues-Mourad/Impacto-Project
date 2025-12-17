const db = require('../db');

// GET /api/profile
exports.getProfile = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      id,
      display_name,
      full_name,
      email,
      phone,
      location,
      role,
      avatar
    FROM users
    WHERE id = ?
  `;

  db.get(sql, [userId], (err, user) => {
    if (err) {
      console.error('PROFILE FETCH ERROR:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });
};

// PUT /api/profile
exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const {
    display_name,
    full_name,
    email,
    phone,
    location,
    avatar
  } = req.body;

  const sql = `
    UPDATE users SET
      display_name = ?,
      full_name = ?,
      email = ?,
      phone = ?,
      location = ?,
      avatar = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [
      display_name,
      full_name,
      email,
      phone,
      location,
      avatar,
      userId
    ],
    function (err) {
      if (err) {
        console.error('PROFILE UPDATE ERROR:', err.message);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ message: 'Profile updated successfully' });
    }
  );
};
