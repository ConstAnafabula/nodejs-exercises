const http = require('http')

const Server = http.createServer((req, res) => {
    if (req.url === '/home-page' && req.method === 'GET') {
        res.statusCode = 200
        res.end('Home Page')
    } else if (req.url === '/about-page' && req.method === 'GET') {
        res.statusCode = 200
        res.end('About Page')
    } else if (req.url === '/contact-page' && req.method === 'GET') {
        res.statusCode = 200
        res.end('Contact Page')
    } else {
        res.statusCode = 404
        res.end('404 Not Found')
    }
})

Server.listen(3000)