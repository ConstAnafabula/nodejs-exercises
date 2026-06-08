const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end(`Welcome to Kaizer's Server`)
    } else if (req.url === '/profile') {
        res.write('Name: Kaizer\n')
        res.end('Course: BSIT')
    } else if (req.url === '/skills') {
        res.end(`Node.js
JavaScript
Git`)
    } else {
        res.end('404 Not Found')
    }
})

server.listen(3000)