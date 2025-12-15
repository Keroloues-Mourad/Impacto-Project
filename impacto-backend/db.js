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

// NGOS
db.run(`
CREATE TABLE IF NOT EXISTS ngos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
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

// DONATIONS
db.run(`
CREATE TABLE IF NOT EXISTS donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_name TEXT,
  food_type TEXT,
  quantity INTEGER,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;