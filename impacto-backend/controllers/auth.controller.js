const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = 'impacto_secret_key';

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  db.run(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [name, email, hashed, role],
    function (err) {
      if (err) return res.status(400).json({ message: 'Email already exists' });
      res.json({ message: 'Account created successfully' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password, role } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ? AND role = ?`,
    [email, role],
    (err, user) => {
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, role: user.role });
    }
  );
};
