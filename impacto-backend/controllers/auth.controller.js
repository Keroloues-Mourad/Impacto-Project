const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = 'impacto_secret_key';

/**
 * Normalize roles coming from BOTH register & login
 * This matches your frontend exactly
 */
function normalizeRole(role) {
  if (!role) return null;

  role = role.toLowerCase().trim();

  if (role === 'donor') return 'donor';
  if (role === 'ngo') return 'ngo';
  if (role === 'public user' || role === 'customer') return 'customer';
  if (role === 'delivery courier' || role === 'courier') return 'courier';
  if (role === 'admin'|| role === 'Admin') return 'admin';

  return null;
}

// ================= REGISTER =================
exports.register = (req, res) => {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const normalizedRole = normalizeRole(role);
  if (!normalizedRole) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, normalizedRole],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      res.json({ message: 'Account created successfully' });
    }
  );
};

// ================= LOGIN =================
exports.login = (req, res) => {
  let { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const normalizedRole = normalizeRole(role);
  if (!normalizedRole) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  db.get(
    `SELECT * FROM users WHERE email = ? AND role = ?`,
    [email, normalizedRole],
    (err, user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        role: user.role
      });
    }
  );
};
