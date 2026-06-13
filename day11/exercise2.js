const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// This program is Case Sensitive
const products = [
    "Laptop",
    "Phone",
    "Keyboard"
];

app.get('/', (req, res) => {
    res.send(`
            <h1>Welcome</h1>
            <a href="http://localhost:3000/products/Laptop">Click to find Laptop</a>
            <br><br>
            <a href="http://localhost:3000/products/Phone">Click to find Phone</a>
            <br><br>
            <a href="http://localhost:3000/products/Keyboard">Click to find Keyboard</a>
        `)
})

app.get('/products/:name', (req, res) => {
    const name = req.params.name
    const productName = name.charAt(0).toUpperCase() + name.slice(1)
    if (products.includes(productName)) {
        res.send(`You have found ${productName}`)
    } else {
        res.send(`Product ${productName} not found`)
    }
})
app.listen(3000, () => {
    console.log('Server Status: Running')
})