const http = require('http')



const Server = http.createServer((req, res) => {
//Route 1: Get All Users
//Route 2: Get One User
//Route 3: Create User (Fake Version)
    

    const users = ['Kaizer', 'Shormaush', 'Anafabula', 'Kharahk', 'Amaranth']
        
    if (req.url === '/users' && req.method === 'GET') {
        res.statusCode = 200;
        const listOfUsers = users.join(', ')
        res.end(`Users: ${listOfUsers}`)
    } else if (req.url === '/users' && req.method === 'POST') {
        res.statusCode = 201;
        res.end('Creating user...')
    } else if (req.url.startsWith('/users/') && req.method === 'GET') {
        const parts = req.url.split('/')
        const id = Number(parts[2])
        if (id > users.length - 1) {
            res.statusCode = 404
            res.end('404 User Not Found')
        } else {
            res.statusCode = 200;
            res.end(`User: ${users[id]}`);
        }
    } else {
        res.statusCode = 404;
        res.end('404 URL Not Found')
    }
})

Server.listen(3000)
