const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./impacto.db');

// USERS (already used)
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

// COURIERS
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
    status TEXT CHECK(status IN ('Available','Accepted','Delivered')) NOT NULL DEFAULT 'Available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (restaurant_id) REFERENCES users(id),
    FOREIGN KEY (ngo_id) REFERENCES users(id)
  )
`);


module.exports = db;