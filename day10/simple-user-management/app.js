const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userInfos = []
//0. Home Page
app.get('/', (req, res) => {
    res.send(`
            <h1>Welcome to My Website</h1>
            <p>
                Hello! This is the homepage of our website.
                Feel free to explore and learn more.
            </p>
            <form action="/add-user" method="get">
                <label>Add a new user</label>
                <button type="submit">Go</button>    
            </form>
            <br>
            <form action="/all-users" method="get">
                <label>View all users</label>
                <button type="submit">Go</button>
            </form>
            <br>
            <form action="/search-user" method="get">
                <label>View a single user</label>
                <button type="submit">Go</button>
            </form>
            <br>
            <form action="/search-user">
                <label>Delete a user</label>
                <button type="submit">Go</button>
            </form>
        `)
})
//1. Add users
app.get('/add-user', (req, res) => {
    res.send(`
            <h1>Add New User</h1>
            <form method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <br><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <br><br>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <br><br>
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required>
                <br><br>
                <button type="submit">Add User</button>
            </form>
            <form action="/" method="get">
                <button type="submit">Go back</button>
            </form>
        `)
})
app.post('/add-user', (req, res) => {
    userInfos.push({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    })
    res.send(`
        User added successfully
        <form action="/" method="get">
            <button type="submit">Go Home</button>
        </form>
        `)
})
//2. View all users
app.get('/all-users', (req, res) => {
    const row = userInfos.map(user => 
        `<tr>
            <td>${user.name}</td>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        </tr>`
    )
    res.send(`
            <h1>All Users</h1>
            <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                ${row}
            </table>
            <br><br><br>
            <form action="/" method="get">
                <button type="submit">Go Home</button>
            </form>
        `)
})
// Search User
app.get('/search-user', (req, res) => {
    res.send(`
        
            <form method="get">
                <label for="name">Enter user name</label>
                <input type="text" name="name" id="name">
                <br><br>
                <button type="submit" formaction="/user">Enter</button>
                <button type="submit" formaction="/delete-user">Delete</button>
            </form>
            <br><br><br>
            <form action="/" method="get">
                <button type="submit">Go Home</button>
            </form>
        `)
})
//3. View single user
app.get('/user', (req, res) => {
    const name = req.query.name
    
    const userFind = userInfos.find(u => u.name === name)
        if (userFind) {
            return res.send(`
                    <h1>User Details</h1>
                    <p><b>Name:</b> ${userFind.name}</p>
                    <p><b>Email:</b> ${userFind.email}</p>
                    <p><b>Phone:</b> ${userFind.phone}</p>
                    <p><b>Password:</b> ${userFind.password}</p>
                    `)
        } else {
            return res.send('User not found')
        }
})
//4. Delete user
app.get('/delete-user', (req, res) => {
    const name = req.query.name
    const index = userInfos.findIndex(u => u.name === name)

    if(index !== -1) {
        userInfos.splice(index, 1)
    }
    res.send(`User Deleted Successfully`)
})
app.listen(3000, () => {
    console.log('Server running')
})