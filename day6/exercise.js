const http = require('http');

console.log('A');

const server = http.createServer((req, res) => {
    console.log('B');

    res.end('Hello');
});

console.log('C');

server.listen(3000);

console.log('D');