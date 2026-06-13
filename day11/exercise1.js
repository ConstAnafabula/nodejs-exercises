const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
    "Kaizer",
    "John",
    "Maria"
];

app.get('/', (req, res) => {
    res.send(`
            <h1>Welcome</h1>
            <h3>Copy and paste:</h3>
            <a href="http://localhost:3000/users/0">Access user named: Kaizer</a>
            <br><br>
            <a href="http://localhost:3000/users/1">Access user named: John</a>
            <br><br>
            <a href="http://localhost:3000/users/2">Access user named: Maria</a>
            `)
})
app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = users[id]
    if (!user) {
        res.send(`User not found`)
    } else {
        res.send(user)
    }
})
app.listen(3000, () => {
    console.log('Server is running')
})