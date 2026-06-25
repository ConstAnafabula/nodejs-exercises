const express = require('express')
const app = express()
const studentRouter = require('./router/students')
const db = require('./db/database')

app.use(express.static('html'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/students', studentRouter)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})
app.get('/total', (req, res) => {
    const totalQuery = `SELECT COUNT(*) AS totalStudents FROM studentsInfo`
    const activeQuery = `SELECT COUNT(*) AS activeStudents FROM studentsInfo WHERE studentStatus = 'Active'`
    const inactiveQuery = `SELECT COUNT(*) AS inactiveStudents FROM studentsInfo WHERE studentStatus = 'Inactive'`
    const graduatedQuery = `SELECT COUNT(*) AS graduatedStudents FROM studentsInfo WHERE studentStatus = 'Graduated'`
    const droppedQuery = `SELECT COUNT(*) AS droppedStudents FROM studentsInfo WHERE studentStatus = 'Dropped'`
    db.get(totalQuery, [], (err, totalRows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        db.get(activeQuery, [], (err, totalActive) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Internal Server Error')
            }
            db.get(inactiveQuery, [], (err, totalInactive) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Internal Server Error')
                }
                db.get(graduatedQuery, [], (err, totalGraduated) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send('Internal Server Error')
                    }
                    db.get(droppedQuery, [], (err, totalDropped) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).send('Internal Server Error')
                        }
                        res.json({
                            totalStudents: totalRows.totalStudents,
                            totalActive: totalActive.activeStudents,
                            totalInactive: totalInactive.inactiveStudents,
                            totalGraduated: totalGraduated.graduatedStudents,
                            totalDropped: totalDropped.droppedStudents
                        })
                    })
                })
            })
        })
    })
})
app.get('/recent', (req, res) => {
    const query = 'SELECT * FROM studentsInfo ORDER BY studentID DESC LIMIT 5'
    db.all(query, [], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.json(rows)
    })
})
app.get('/distribution', (req, res) => {
    const itQuery = `SELECT COUNT(*) AS itStudents FROM studentsInfo WHERE course = 'BSIT'`
    const csQuery = `SELECT COUNT(*) AS csStudents FROM studentsInfo WHERE course = 'BSCS'`
    const baQuery = `SELECT COUNT(*) AS baStudents FROM studentsInfo WHERE course = 'BSBA'`
    const edQuery = `SELECT COUNT(*) AS edStudents FROM studentsInfo WHERE course = 'BSEd'`
    db.get(itQuery, [], (err, totalIT) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Internal Server Error')
        }
        db.get(csQuery, [], (err, totalCS) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Internal Server Error')
            }
            db.get(baQuery, [], (err, totalBA) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Internal Server Error')
                }
                db.get(edQuery, [], (err, totalEd) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send('Internal Server Error')
                    }
                    res.json({
                        totalIT: totalIT.itStudents,
                        totalCS: totalCS.csStudents,
                        totalBA: totalBA.baStudents,
                        totalEd: totalEd.edStudents,
                    })
                })
            })
        })
    })
})
app.get
app.listen(3000, () => {
    console.log("Running");
})