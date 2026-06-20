const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./inventory.db')

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        productID INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT,
        price INTEGER
    );
    `)
module.exports = db