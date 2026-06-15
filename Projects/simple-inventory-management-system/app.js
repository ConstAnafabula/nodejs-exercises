const express = require('express')
const app = express()
let loggedIn = false

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
})

function checkAuth(req, res, next) {
    if (!loggedIn) {
        return res.redirect('/login')
    } 
    next()
}
function checkGuest(req, res, next) {
    if (loggedIn) {
        return res.redirect('/dashboard')
    }
    next()
}

const products = [
    {
        id: 1,
        productName: "Laptop",
        category: "Electronics",
        price: 45000,
        quantity: 10
    },
    {
        id: 2,
        productName: "Mouse",
        category: "Accessories",
        price: 500,
        quantity: 50
    },
    {
        id: 3,
        productName: "Keyboard",
        category: "Accessories",
        price: 1200,
        quantity: 30
    },
    {
        id: 4,
        productName: "Monitor",
        category: "Electronics",
        price: 8500,
        quantity: 15
    },
    {
        id: 5,
        productName: "Printer",
        category: "Office Equipment",
        price: 6500,
        quantity: 8
    }
];

app.get('/', (req, res) => {
    const homepage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Simple Inventory System</title>
                    <style>
                        body {
                            margin: 0;
                            font-family: Arial, sans-serif;
                            background: #f5f7fa;
                            color: #333;
                        }
                        .nav {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 15px 30px;
                            background: white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                        }
                        .nav .logo {
                            font-weight: bold;
                            color: #2c3e50;
                        }
                        .nav a {
                            margin-left: 15px;
                            text-decoration: none;
                            color: #2c3e50;
                            font-weight: 500;
                        }
                        .nav a:hover {
                            color: #27ae60;
                        }
                        .hero {
                            background: #2c3e50;
                            color: white;
                            padding: 80px 20px;
                            text-align: center;
                        }
                        .hero h1 {
                            font-size: 40px;
                            margin-bottom: 10px;
                        }
                        .hero p {
                            font-size: 18px;
                            opacity: 0.9;
                        }
                        .container {
                            max-width: 900px;
                            margin: 50px auto;
                            padding: 0 20px;
                            text-align: center;
                        }
                        .features {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                            gap: 20px;
                            margin-top: 30px;
                        }
                        .card {
                            background: white;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                        }
                        .btn {
                            display: inline-block;
                            margin-top: 30px;
                            padding: 12px 25px;
                            background: #27ae60;
                            color: white;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: bold;
                            margin-right: 10px;
                        }
                        .btn:hover {
                            background: #219150;
                        }
                        .btn-secondary {
                            background: #2c3e50;
                        }
                        .btn-secondary:hover {
                            background: #1a242f;
                        }
                        .footer {
                            margin-top: 60px;
                            padding: 20px;
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="nav">
                        <div class="logo">📦 Inventory System</div>
                        <div>
                            <a href="http://localhost:3000/">Home</a>
                            <a href="/login">Login</a>
                            <a href="/dashboard">Dashboard</a>
                        </div>
                    </div>
                    <div class="hero">
                        <h1>📦 Simple Inventory Management System</h1>
                        <p>Track, manage, and organize your products with ease</p>
                        <a class="btn" href="/login">Login</a>
                        <a class="btn btn-secondary" href="/dashboard">Go to Dashboard</a>
                    </div>
                    <div class="container">
                        <h2>What this system does</h2>
                        <p>
                            A lightweight inventory system designed for learning and small-scale management.
                            Easily add, update, and track products after logging in.
                        </p>
                        <div class="features">
                            <div class="card">
                                <h3>📊 Track Inventory</h3>
                                <p>Keep an overview of all your products in one place.</p>
                            </div>
                            <div class="card">
                                <h3>⚡ Fast Management</h3>
                                <p>Simple and quick CRUD operations for products.</p>
                            </div>
                            <div class="card">
                                <h3>🔐 Secure Access</h3>
                                <p>Login required before accessing system features.</p>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        © 2026 Simple Inventory System
                    </div>
                </body>
                </html>
    `
    res.send(homepage)
})
app.get('/login', checkGuest, (req, res) => {
    const loginPage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Login - Inventory System</title>
                    <style>
                        body {
                            margin: 0;
                            font-family: Arial, sans-serif;
                            background: #f5f7fa;
                        }
                        .nav {
                            display: flex;
                            justify-content: space-between;
                            padding: 15px 30px;
                            background: white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                        }
                        .nav a {
                            text-decoration: none;
                            color: #2c3e50;
                            margin-left: 15px;
                            font-weight: 500;
                        }
                        .nav a:hover {
                            color: #27ae60;
                        }
                        .container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 80vh;
                        }
                        .login-box {
                            background: white;
                            padding: 40px;
                            width: 320px;
                            border-radius: 10px;
                            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                            text-align: center;
                        }
                        .login-box h2 {
                            margin-bottom: 20px;
                            color: #2c3e50;
                        }
                        input {
                            width: 100%;
                            padding: 12px;
                            margin: 10px 0;
                            border: 1px solid #ccc;
                            border-radius: 6px;
                            outline: none;
                        }
                        input:focus {
                            border-color: #27ae60;
                        }
                        .btn {
                            width: 100%;
                            padding: 12px;
                            margin-top: 10px;
                            background: #27ae60;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: bold;
                        }
                        .btn:hover {
                            background: #219150;
                        }
                        .footer-text {
                            margin-top: 15px;
                            font-size: 13px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>

                    <div class="nav">
                        <div><b>📦 Inventory System</b></div>
                        <div>
                            <a href="/">Home</a>
                            <a href="/dashboard">Dashboard</a>
                        </div>
                    </div>
                    <div class="container">
                        <div class="login-box">
                            <h2>🔐 Login</h2>
                            <form action="/login" method="POST">
                                <input type="text" name="username" placeholder="Username" required />
                                <input type="password" name="password" placeholder="Password" required />
                                <button class="btn" type="submit">Login</button>
                            </form>
                            <div class="footer-text">
                                Demo system — no real authentication yet
                            </div>
                        </div>
                    </div>
                </body>
                </html>
    `
    res.send(loginPage)
})
app.post('/login', checkGuest, (req, res) => {
    const name = req.body.username
    const password = req.body.password

    if (name === "admin" && password === "admin123") {
        loggedIn = true
        res.redirect('/dashboard')
    }
})
app.get('/dashboard', checkAuth, (req, res) => {
    const dashboard = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Inventory System</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            background: #f4f6f8;
                        }
                        .header {
                            background: #2c3e50;
                            color: white;
                            padding: 20px;
                            text-align: center;
                            position: relative;
                        }
                        .logout-btn {
                            position: absolute;
                            top: 20px;
                            right: 20px;
                            padding: 10px 15px;
                            background: #e74c3c;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold;
                        }
                        .logout-btn:hover {
                            background: #c0392b;
                        }
                        .container {
                            max-width: 900px;
                            margin: 40px auto;
                            padding: 20px;
                        }
                        .card-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                            gap: 20px;
                        }
                        .card {
                            background: white;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            text-align: center;
                        }
                        .card h3 {
                            margin-bottom: 10px;
                        }
                        .btn {
                            display: inline-block;
                            margin-top: 10px;
                            padding: 10px 15px;
                            background: #2c3e50;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .btn:hover {
                            background: #1a242f;
                        }
                        .status {
                            margin-top: 20px;
                            margin-bottom: 30px;
                            padding: 10px;
                            background: #dff0d8;
                            color: #3c763d;
                            border-radius: 5px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <a href="/logout" class="logout-btn">🚪 Logout</a>
                        <h1>📦 Simple Inventory Management System</h1>
                        <p>Manage your products easily</p>
                    </div>
                    <div class="container">
                        <div class="status">
                            Server Status: 🟢 Running
                        </div>
                        <div class="card-grid">
                            <div class="card">
                                <h3>➕ Add Product</h3>
                                <p>Create new inventory items</p>
                                <a class="btn" href="/dashboard/add-product">Go</a>
                            </div>
                            <div class="card">
                                <h3>📋 View Products</h3>
                                <p>See all stored items</p>
                                <a class="btn" href="/dashboard/products">View</a>
                            </div>
                            <div class="card">
                                <h3>✏️ Update Product</h3>
                                <p>Edit product details</p>
                                <a class="btn" href="/dashboard/search-product">Edit</a>
                            </div>
                            <div class="card">
                                <h3>🗑️ Delete Product</h3>
                                <p>Remove items from inventory</p>
                                <a class="btn" href="/dashboard/delete-product">Delete</a>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
    `
    res.send(dashboard)
})
app.get('/dashboard/add-product', checkAuth, (req, res) => {
    const addProducts = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Add Product</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                background: #f4f6f8;
                            }
                            .header {
                                background: #2c3e50;
                                color: white;
                                padding: 20px;
                                text-align: center;
                            }
                            .container {
                                max-width: 600px;
                                margin: 40px auto;
                                padding: 20px;
                            }
                            .form-card {
                                background: white;
                                padding: 30px;
                                border-radius: 10px;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            }
                            .form-card h2 {
                                text-align: center;
                                margin-bottom: 25px;
                                color: #2c3e50;
                            }
                            label {
                                display: block;
                                margin-top: 15px;
                                margin-bottom: 5px;
                                font-weight: bold;
                            }
                            input {
                                width: 100%;
                                padding: 10px;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                box-sizing: border-box;
                            }
                            .btn-group {
                                margin-top: 25px;
                                text-align: center;
                            }
                            .btn {
                                padding: 10px 20px;
                                border: none;
                                border-radius: 5px;
                                text-decoration: none;
                                cursor: pointer;
                                font-size: 15px;
                            }
                            .btn-add {
                                background: #27ae60;
                                color: white;
                            }
                            .btn-add:hover {
                                background: #219150;
                            }
                            .btn-back {
                                background: #2c3e50;
                                color: white;
                                margin-left: 10px;
                            }
                            .btn-back:hover {
                                background: #1a242f;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>📦 Simple Inventory Management System</h1>
                        </div>
                        <div class="container">
                            <div class="form-card">
                                <h2>➕ Add Product</h2>
                                <form action="/dashboard/add-product" method="POST">
                                    <label>Product Name</label>
                                    <input type="text" name="productName" placeholder="Enter product name" required>
                                    <label>Category</label>
                                    <input type="text" name="category" placeholder="Enter category" required>
                                    <label>Price</label>
                                    <input type="number" name="price" placeholder="Enter price" required>
                                    <label>Quantity</label>
                                    <input type="number" name="quantity" placeholder="Enter quantity" required>
                                    <div class="btn-group">
                                        <button class="btn btn-add" type="submit">Add Product</button>
                                        <a class="btn btn-back" href="/dashboard">Back</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </body>
                    </html>
    `
    res.send(addProducts)
})
app.post('/dashboard/add-product', checkAuth, (req, res) => {
    products.push({
        id: products.length + 1, 
        productName: req.body.productName,
        category: req.body.category,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity)
    })
    res.redirect('/dashboard/products')
})
app.get('/dashboard/products', checkAuth, (req, res) => {
    const rows = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
        </tr>
    `).join('')
    const allProducts = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>View Products</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                background: #f4f6f8;
                            }
                            .header {
                                background: #2c3e50;
                                color: white;
                                padding: 20px;
                                text-align: center;
                            }
                            .container {
                                max-width: 1000px;
                                margin: 40px auto;
                                padding: 20px;
                            }
                            .top-bar {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-bottom: 20px;
                            }
                            .btn {
                                padding: 10px 15px;
                                background: #2c3e50;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                            }
                            .btn:hover {
                                background: #1a242f;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                background: white;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            }
                            th {
                                background: #2c3e50;
                                color: white;
                                padding: 12px;
                            }
                            td {
                                padding: 12px;
                                text-align: center;
                                border-bottom: 1px solid #ddd;
                            }
                            tr:hover {
                                background: #f8f9fa;
                            }
                            .empty {
                                text-align: center;
                                padding: 30px;
                                background: white;
                                color: #777;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>📋 View Products</h1>
                            <p>See all stored inventory items</p>
                        </div>
                        <div class="container">
                            <div class="top-bar">
                                <h2>Product List</h2>
                                <a href="/dashboard" class="btn">⬅ Back to Dashboard</a>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </body>
                    </html>
                    `
    res.send(allProducts)
})
app.get('/dashboard/search-product', checkAuth, (req, res) => {
    const searchProduct = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Update Product</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    background: #f4f6f8;
                                }
                                .header {
                                    background: #2c3e50;
                                    color: white;
                                    padding: 20px;
                                    text-align: center;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 40px auto;
                                    padding: 20px;
                                }
                                .card {
                                    background: white;
                                    padding: 30px;
                                    border-radius: 10px;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                }
                                h2 {
                                    text-align: center;
                                    color: #2c3e50;
                                    margin-bottom: 25px;
                                }
                                label {
                                    display: block;
                                    margin-top: 15px;
                                    margin-bottom: 5px;
                                    font-weight: bold;
                                }
                                input {
                                    width: 100%;
                                    padding: 10px;
                                    box-sizing: border-box;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                }
                                .btn-group {
                                    margin-top: 25px;
                                    text-align: center;
                                }
                                .btn {
                                    padding: 10px 20px;
                                    border: none;
                                    border-radius: 5px;
                                    text-decoration: none;
                                    cursor: pointer;
                                    font-size: 15px;
                                }
                                .btn-update {
                                    background: #f39c12;
                                    color: white;
                                }
                                .btn-update:hover {
                                    background: #d68910;
                                }
                                .btn-back {
                                    background: #2c3e50;
                                    color: white;
                                    margin-left: 10px;
                                }
                                .btn-back:hover {
                                    background: #1a242f;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="header">
                                <h1>📦 Simple Inventory Management System</h1>
                            </div>
                            <div class="container">
                                <div class="card">
                                    <h2>✏️ Search Product</h2>
                                    <form action="/dashboard/update-product" method="get">
                                        <label>Product ID</label>
                                        <input type="number" name="id" placeholder="Enter product ID" required>
                                        <div class="btn-group">
                                            <button class="btn btn-update" type="submit">Find Product</button>
                                            <a class="btn btn-back" href="/dashboard">Back</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </body>
                        </html>
    `
    res.send(searchProduct)
})
app.get('/dashboard/update-product', checkAuth, (req, res) => {
    const id = Number(req.query.id)
    const product = products.find(product => product.id === id)
    const updateProduct = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Update Product</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    background: #f4f6f8;
                                }
                                .header {
                                    background: #2c3e50;
                                    color: white;
                                    padding: 20px;
                                    text-align: center;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 40px auto;
                                    padding: 20px;
                                }
                                .card {
                                    background: white;
                                    padding: 30px;
                                    border-radius: 10px;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                }
                                h2 {
                                    text-align: center;
                                    color: #2c3e50;
                                    margin-bottom: 25px;
                                }
                                label {
                                    display: block;
                                    margin-top: 15px;
                                    margin-bottom: 5px;
                                    font-weight: bold;
                                }
                                input {
                                    width: 100%;
                                    padding: 10px;
                                    box-sizing: border-box;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                }
                                .btn-group {
                                    margin-top: 25px;
                                    text-align: center;
                                }
                                .btn {
                                    padding: 10px 20px;
                                    border: none;
                                    border-radius: 5px;
                                    text-decoration: none;
                                    cursor: pointer;
                                    font-size: 15px;
                                }
                                .btn-update {
                                    background: #f39c12;
                                    color: white;
                                }
                                .btn-update:hover {
                                    background: #d68910;
                                }
                                .btn-back {
                                    background: #2c3e50;
                                    color: white;
                                    margin-left: 10px;
                                }
                                .btn-back:hover {
                                    background: #1a242f;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="header">
                                <h1>📦 Simple Inventory Management System</h1>
                            </div>
                            <div class="container">
                                <div class="card">
                                    <h2>✏️ Update Product</h2>
                                    <form action="/dashboard/update-product" method="post">
                                        <label>Product ID</label>
                                        <input type="number" name="id" value="${product.id}" readOnly>
                                        <label>Product Name</label>
                                        <input type="text" name="productName" placeholder="Enter updated product name [Current name: ${product.productName}]" required>
                                        <label>Category</label>
                                        <input type="text" name="category" placeholder="Enter updated category [Current category: ${product.category}]" required>
                                        <label>Price</label>
                                        <input type="number" name="price" placeholder="Enter updated price [Current price: ${product.price}]" required>
                                        <label>Quantity</label>
                                        <input type="number" name="quantity" placeholder="Enter updated quantity [Current quantity: ${product.quantity}]" required>
                                        <div class="btn-group">
                                            <button class="btn btn-update" type="submit">Update Product</button>
                                            <a class="btn btn-back" href="/dashboard/search-product">Back</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </body>
                        </html>
    `
    res.send(updateProduct)
})
app.post('/dashboard/update-product', checkAuth, (req, res) => {
    const id = Number(req.body.id)
    const updatedProduct = {
        productName: req.body.productName,
        category: req.body.category,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity)
    }
    const i = products.findIndex(product => product.id === id)
    
    if (i !== -1) {
        products[i] = {
        id: id,
        productName: req.body.productName,
        category: req.body.category,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity)
        }
    }
    res.redirect('/dashboard/products')
})
app.get('/dashboard/delete-product', checkAuth, (req, res) => {
    const deleteProduct = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Delete Product</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    background: #f4f6f8;
                                }
                                .header {
                                    background: #2c3e50;
                                    color: white;
                                    padding: 20px;
                                    text-align: center;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 40px auto;
                                    padding: 20px;
                                }
                                .card {
                                    background: white;
                                    padding: 30px;
                                    border-radius: 10px;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                }
                                h2 {
                                    text-align: center; 
                                    color: #2c3e50;
                                    margin-bottom: 10px;
                                }
                                .warning {
                                    text-align: center;
                                    color: #e74c3c;
                                    margin-bottom: 25px;
                                }
                                label {
                                    display: block;
                                    margin-bottom: 5px;
                                    font-weight: bold;
                                }
                                input {
                                    width: 100%;
                                    padding: 10px;
                                    box-sizing: border-box;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                }
                                .btn-group {
                                    margin-top: 25px;
                                    text-align: center;
                                }
                                .btn {
                                    padding: 10px 20px;
                                    border: none;
                                    border-radius: 5px;
                                    text-decoration: none;
                                    cursor: pointer;
                                    font-size: 15px;
                                }
                                .btn-delete {
                                    background: #e74c3c;
                                    color: white;
                                }
                                .btn-delete:hover {
                                    background: #c0392b;
                                }
                                .btn-back {
                                    background: #2c3e50;
                                    color: white;
                                    margin-left: 10px;
                                }
                                .btn-back:hover {
                                    background: #1a242f;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="header">
                                <h1>📦 Simple Inventory Management System</h1>
                            </div>
                            <div class="container">
                                <div class="card">
                                    <h2>🗑️ Delete Product</h2>
                                    <p class="warning">This action cannot be undone.</p>
                                    <form action="/dashboard/delete-product" method="POST">
                                        <label>Product ID</label>
                                        <input type="number" name="id" placeholder="Enter product ID" required>
                                        <div class="btn-group">
                                            <button class="btn btn-delete" type="submit">Delete Product</button>
                                            <a class="btn btn-back" href="/dashboard">Back</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </body>
                        </html>
    `
    res.send(deleteProduct)
})
app.post('/dashboard/delete-product', checkAuth, (req, res) => {
    const id = req.body.id
    const confimation = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Confirm Delete</title>
                        </head>
                        <body style="font-family: Arial; text-align:center; padding:50px; background:#f4f6f8;">
                            <div style="background:white; padding:40px; border-radius:10px; display:inline-block; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                                <h2 style="color:#2c3e50;">⚠️ Confirm Delete</h2>
                                <p>Are you sure you want to delete product ID:<b> ${id}</b>?</p>
                                <form method="POST" action="/dashboard/delete-product/confirm" style="margin-top:20px;">
                                    <input type="hidden" name="id" value="${id}">
                                    <button type="submit" style="padding:10px 20px; background:#e74c3c; color:white; border:none; border-radius:5px; cursor:pointer; margin-right:10px;">Yes, Delete</button>
                                    <a href="/dashboard" style="padding:10px 20px; background:#2c3e50; color:white; text-decoration:none; border-radius:5px; display:inline-block;">Cancel</a>
                                </form>
                            </div>
                        </body>
                        </html>
    `
    res.send(confimation)
})
app.post('/dashboard/delete-product/confirm', checkAuth, (req, res) => {
    const id = Number(req.body.id)
    const i = products.findIndex(product => product.id === id)
    if (i !== -1) {
        products.splice(i, 1)
    }
    res.redirect('/dashboard/products')
})
app.get('/logout', checkAuth, (req, res) => {
    loggedIn = false
    res.redirect('/login')
})
app.listen(3000, () => {
    console.log('Server Status: 🟢 Running')
})