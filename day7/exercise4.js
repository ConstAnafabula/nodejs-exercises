const http = require('http');

let users = ['Kaizer', 'Shormaush', 'Anafabula', 'Kharahk'];

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200
        res.end('Welcome to Kaizer API');
    } else if (req.url === '/users' && req.method === 'GET') {
        const user = users.join(', ')
        res.statusCode = 200
        res.end(`Users: ${user}`);
    } else if (req.url === '/users' && req.method === 'POST') {
        res.statusCode = 200
        res.end('Creating a user') 
    } else {
        res.statusCode = 404
        res.end('404 Not Found')
    }
})

server.listen(3000)