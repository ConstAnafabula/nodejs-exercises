const express = require('express')
const app = express()
const users = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Kaizer API</h1>
        <p>Status: Running</p>
        `)
})
app.get('/form', (req, res) => {
    res.send(`
        <form method="POST" action="/users">
            <input name="name" placeholder="Enter name" />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/users', (req, res) => {
    users.push(req.body.name)
    res.send(`Users: ${users}`)
    
})

app.listen(3000, () => {
    console.log('Server is Running')
})