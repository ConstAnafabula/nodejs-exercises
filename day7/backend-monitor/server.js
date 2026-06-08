const http = require('http')

const appName = "Backend Monitor"
const nodeVer = process.version
let count = 0;

const server = http.createServer((req, res) => {
    count++
    res.write(`Application Name: ${appName}\n`)
    res.write(`Node Version: ${nodeVer}\n`)
    res.end(`Requests Received: ${count}`)
})

server.listen(3000)