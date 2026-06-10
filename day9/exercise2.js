const express = require('express');
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const usersInfo = [];
const users = [];

function callback(req, res) {
    res.send(`
            <h1>Welcome to my Server</h1>
            <h4>Server Status: Running</h4>
            <form action="/form" method="get">
                <label>Go to Forms Page</label>
            </form>
        `)
}

app.get('/', (req, res) => {
    res.send(`
            <h1>Welcome to my Server</h1>
            <h4>Server Status: Running</h4>
            <form action="/forms" method="get">
                <label>Go to Forms Page</label>
                <button type="submit">Go</button>
            </form>
        `)
})

app.get('/forms', (req, res) => {
    res.send(`
            <h1>Welcome to my Forms Page</h1>
            <form action="/users" method="post">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Enter your name">
                <br>
                <label for="password">Password</label>
                <input type="text" name="password" placeholder="Enter your password">
                <br>
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="yourname@gmail.com">
                <br>
                <label for="phone">Phone Number</label>
                <input type="text" name="phone" placeholder="0900909909">
                <br>
                <button type="submit">Submit</button>
            </form>
        `)
})

app.post('/users', (req, res) => {
    usersInfo.push([req.body.name, req.body.password, req.body.email, req.body.phone])
    users.push(req.body.name)
    res.send(`
            <h1>List of Users</h1>
            Users: ${users.join(', ')}
            <form action="/users-info" method="get">
                <label>See All Users' Info</label>
                <button type="submit">Go</button>
            </form>
        `)
})

app.get('/users-info', (req, res) => {
    res.write(`<h1>Users' Information<h1>`)
    for (let counter = 0; counter < usersInfo.length; counter++) {
        res.write(`
            User #${counter+1}: ${usersInfo[counter].join(', ')}
            <br>
        `)
    }
    res.end();
})

app.listen(3000, () => {
    console.log('Server is running')
})