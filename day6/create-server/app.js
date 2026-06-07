const http = require('http')

const server = http.createServer((req, res) => {
    res.write('Name: Kaizer\n')
    res.write('Course: BSIT\n')
    res.end('Learning Node.js Backend')
})

server.listen(3000)