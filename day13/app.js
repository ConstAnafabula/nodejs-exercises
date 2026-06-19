const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./inventory.db')

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT,
        price INTEGER
    ) 
    `)
db.run(
    'INSERT INTO products (productName, price) VALUES (?, ?)', ['Laptop', 45000]
)
db.all(
    'SELECT * FROM products', [], (err, rows) => {
        console.log(rows)
    }
)