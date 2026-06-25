const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db/database')
const { totalmem } = require('os')
const { dir, log } = require('console')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'students.html'))
})
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM studentsInfo'
    db.all(query, [], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json({
            studentRows: rows,
            totalNum: rows.length            
        })
    })
})
router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'add.html'))
})
router.post('/new', (req, res) => {
    const { firstName, lastName, birthday, contactNumber, address, email, status, course, yearLvl 
    } = req.body
    const query = 'INSERT INTO studentsInfo(firstName, lastName, email, course, yearLvl, birthday, contactNumber, address, studentStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.run(query, [firstName, lastName, email, course, yearLvl, birthday, contactNumber, address, status], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json({ success: true })
    })
})
router.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'search.html'))
})
router.get('/find', (req, res) => {
    const q = req.query.q

    if (!q || !q.trim()) {
        return res.json({
            rows: [],
            total: 0
        })
    }
    const value = `%${q}%`
    const query = `SELECT * FROM studentsInfo WHERE studentID LIKE ?
    OR firstName || ' ' || lastName LIKE ? 
    OR firstName LIKE ?
    OR lastName LIKE ?
    OR course LIKE ?`
    db.all(query, [value, value, value, value, value], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json({
            rows: rows,
            total: rows.length
        })
    })
})
router.get('/:id/view', (req, res) => {
    const id = Number(req.params.id)
    const query = `SELECT * FROM studentsInfo WHERE studentID = ?`
    db.get(query, [id], (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json(row)
    })
})
router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'student.html'))
})
router.get('/:id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'edit.html'))
})
router.get('/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const query = 'SELECT * FROM studentsInfo WHERE studentID = ?'
    db.get(query, [id], (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json(row)
    })
})
router.put('/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const {firstName, lastName, birthDate, contactNumber, address, studentID, email, course, yearLevel, status} = req.body
    const query = 'UPDATE studentsInfo SET firstName = ?, lastName = ?, email = ?, course = ?, yearLvl = ?, birthday = ?, contactNumber = ?, address = ?, studentStatus = ? WHERE studentID = ?'
    db.run(query, [firstName, lastName, email, course, yearLevel, birthDate, contactNumber, address, status, id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json({ success: true })
    })
})
router.get('/:id/delete', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'delete.html'))
})
router.get('/:id/remove', (req, res) => {
    const id = Number(req.params.id)
    const query = 'SELECT * FROM studentsInfo WHERE studentID = ?'
    db.get(query, [id], (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json(row)
    })
})
router.delete('/:id/delete', (req, res) => {
    const id = Number(req.params.id)
    const query = 'DELETE FROM studentsInfo WHERE studentID = ?'
    db.run(query, [id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json({ success: true })
    })
})
module.exports = router