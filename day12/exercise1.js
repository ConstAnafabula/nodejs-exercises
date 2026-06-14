const express = require('express')
const app = express()


app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
})
app.get('/', (req, res) => {
    res.send('Welcome')
})
app.get('/users', (req, res) => {
    res.send('Users')
})
app.post('/users', (req, res) => {
    res.send('Users')
})

app.listen(3000, () => {
    console.log('Server Status: Running')
})