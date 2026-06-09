const http = require('http')

const users = ['Kaizer', 'Shormaush', 'Anafabula'];

const Server = http.createServer((req, res) => {
    const parts = req.url.split('/');
    const id = Number(parts[2])
    
    if (req.url === '/') {
        res.statusCode = 200
        res.end('You are in home page')
    } else if (req.url == '/users') {
        res.statusCode = 200
        res.end('You are in users page')        
    } else if (req.url.startsWith('/users/')) {
        res.statusCode = 200
        res.end(users[id])
    } else {
        res.statusCode = 404
        res.end('404 Not Found')
    }  
})

Server.listen(3000)