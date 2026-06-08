const http = require('http');

let users = ['Kaizer', 'Shormaush', 'Anafabula', 'Kharahk'];

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.end('Welcome to Kaizer API');
    } else if (req.url === '/users' && req.method === 'GET') {
        const user = users.join(', ')
        res.end(`Users: ${user}`);
    } else if (req.url === '/users' && req.method === 'POST') {
        res.end('Creating a user') 
    } else {
        res.end('404 Not Found')
    }
})

server.listen(3000)