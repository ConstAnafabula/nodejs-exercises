const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Express')
})
app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('User received');
})

app.listen(3000, () => {
    console.log('Server Running')
})