const http = require('http');

let counter = 1;

const server = http.createServer((req, res) => {
    console.log(`[Request ${counter}]`);
    console.log('Request Received');
    counter++;
    res.end('Server Started');
});

server.listen(3000);