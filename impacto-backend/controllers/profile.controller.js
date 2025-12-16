const db = require('../db');

/**
 * GET /api/me
 */
exports.getMyProfile = (req, res) => {
  const userId = req.user.id;

  db.get(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      u.role,
      c.phone,
      c.address
    FROM users u
    LEFT JOIN customers c ON c.user_id = u.id
    WHERE u.id = ?
    `,
    [userId],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to load profile' });
      }
      res.json(row);
    }
  );
};

/**
 * PUT /api/me
 */
exports.updateMyProfile = (req, res) => {
  const userId = req.user.id;
  const { name, email, phone, address } = req.body;

  db.serialize(() => {
    // 1️⃣ Update users table
    db.run(
      `UPDATE users SET name = ?, email = ? WHERE id = ?`,
      [name, email, userId]
    );

    // 2️⃣ Remove old customer row (if exists)
    db.run(
      `DELETE FROM customers WHERE user_id = ?`,
      [userId]
    );

    // 3️⃣ Insert fresh customer row
    db.run(
      `
      INSERT INTO customers (user_id, phone, address)
      VALUES (?, ?, ?)
      `,
      [userId, phone || null, address || null],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Profile update failed' });
        }

        res.json({ message: 'Profile updated successfully' });
      }
    );
  });
};
