const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./students.db')

db.run(`
    CREATE TABLE IF NOT EXISTS studentsInfo (
        studentID INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        course TEXT NOT NULL,
        yearLvl INTEGER NOT NULL,
        birthday TEXT NOT NULL,
        contactNumber TEXT NOT NULL,
        address TEXT NOT NULL,
        studentStatus TEXT NOT NULL
    );
    `)
module.exports = db