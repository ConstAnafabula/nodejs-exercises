const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
    { id: 1, name: "Kaizer" },
    { id: 2, name: "John" },
    { id: 3, name: "Maria" }
];

app.get('/', (req, res) => {
    res.send(`
            <h1>Welcome</h1>
            <a href="http://localhost:3000/users/1">Click to find Kaizer</a>
            <br><br>
            <a href="http://localhost:3000/users/2">Click to find John</a>
            <br><br>
            <a href="http://localhost:3000/users/3">Click to find Maria</a>
        `)
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    if (user) {
        res.send(user)
    } else {
        res.send(`Can't find any user with an index of ${id}`)
    }
})

app.listen(3000, () => {
    console.log('Server Status: Running')
})