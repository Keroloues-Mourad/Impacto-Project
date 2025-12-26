const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./impacto.db', (err) => {
  if (err) {
    console.error('Failed to connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

/* ================= USERS ================= */
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

/* ================= NGOS ================= */
db.run(`
CREATE TABLE IF NOT EXISTS ngos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  verified INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

/* ================= COURIERS ================= */
db.run(`
CREATE TABLE IF NOT EXISTS couriers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

/* ================= DONATIONS ================= */
db.run(`
CREATE TABLE IF NOT EXISTS donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_id INTEGER NOT NULL,
  ngo_id INTEGER,
  food_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  expiry TEXT NOT NULL,

  -- ✅ NEW FEATURES
  image TEXT,
  notes TEXT,

  status TEXT CHECK(status IN ('Available','Accepted','Delivered'))
    NOT NULL DEFAULT 'Available',

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES users(id),
  FOREIGN KEY (ngo_id) REFERENCES users(id)
)
`);

/* ================= CUSTOMERS ================= */
db.run(`
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  phone TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)
)
`);

/* ================= ORDERS ================= */
db.run(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  donation_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT CHECK(status IN ('Pending','Approved','Delivered'))
    DEFAULT 'Pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (donation_id) REFERENCES donations(id)
)
`);

module.exports = db;
