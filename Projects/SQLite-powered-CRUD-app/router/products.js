const express = require('express')
const router = express.Router()
const db = require('../db/database')

router.get('/', (req, res) => {
    const query = 'SELECT * FROM products'
    db.all(query, [], (err, rows) => {
        if (err) {
            console.log('Database Error')
            return res.status(500).send('Database Error')
        }
        const emptyState = rows.length === 0 ? `<div class="empty">No products found. Start by adding a new product.</div>` : ''
        const tableRows = rows.map(product => {
            return `
            <tr>
                <td>${product.productID}</td>
                <td>${product.productName}</td>
                <td>${product.price}</td>
                <td>
                <div class="actions">
                    <a href="/products/${product.productID}/update" class="edit-btn">Edit</a>
                    <a href="/delete/1" class="delete-btn">Delete</a>
                    </div>
                </td>
            </tr>
            `
        }).join('')
        const productsPage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Products List</title>
            <style>
                body { background:#f5f7fb; color:#1f2937; line-height:1.6; font-family:Arial,sans-serif; } 
                header { background:#fff; padding:15px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e5e7eb; position:sticky; top:0; } 
                .logo { font-weight:bold; font-size:18px; color:#2563eb; text-decoration:none; } 
                nav a { margin:0 10px; text-decoration:none; color:#1f2937; font-size:14px; } 
                nav a:hover { color:#2563eb; } 
                .btn-primary { background:#2563eb; color:#fff; padding:8px 14px; border-radius:6px; text-decoration:none; font-size:13px; } 
                .container { max-width:1000px; margin:40px auto; padding:0 20px; } 
                .page-title { font-size:24px; margin-bottom:5px; } 
                .subtitle { color:#6b7280; margin-bottom:20px; } 
                table { width:100%; border-collapse:collapse; background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; } 
                th,td { padding:12px; text-align:left; font-size:14px; } 
                th { background:#f9fafb; border-bottom:1px solid #e5e7eb; color:#374151; } 
                tr { border-bottom:1px solid #e5e7eb; } 
                tr:hover { background:#f3f4f6; } 
                .actions { display:flex; gap:8px; } 
                .edit-btn { background:#f59e0b; color:#fff; padding:5px 10px; border-radius:5px; text-decoration:none; font-size:12px; } 
                .delete-btn { background:#ef4444; color:#fff; padding:5px 10px; border-radius:5px; text-decoration:none; font-size:12px; } 
                .empty { text-align:center; padding:40px; color:#6b7280; background:#fff; border:1px solid #e5e7eb; border-radius:8px; }
            </style>
            </head>
            <body>
            <header>
                <a href="/" class="logo">SQLite CRUD</a>
                <nav>
                <a href="/">Home</a>
                <a href="/products">Products</a>
                </nav>
                <a href="/products/new" class="btn-primary">+ Add Product</a>
            </header>
            <div class="container">
                <h1 class="page-title">Products List</h1>
                <p class="subtitle">All products stored in your SQLite database (GET /products)</p>
                <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
                </table>
                ${emptyState}
            </div>
            </body>
            </html>
            ` 
        res.send(productsPage)

    })    
})
router.get('/new', (req, res) => {
    const addProduct = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Add Product</title>
        <style>
            body { background:#f5f7fb; color:#1f2937; line-height:1.6; font-family:Arial,sans-serif; }
            header { background:#fff; padding:15px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e5e7eb; position:sticky; top:0; }
            .logo { font-weight:bold; font-size:18px; color:#2563eb; text-decoration:none; }
            nav a { margin:0 10px; text-decoration:none; color:#1f2937; font-size:14px; }
            nav a:hover { color:#2563eb; }
            .btn-primary { background:#2563eb; color:#fff; padding:8px 14px; border-radius:6px; text-decoration:none; font-size:13px; }
            .container { max-width:600px; margin:50px auto; padding:0 20px; }
            .page-title { font-size:24px; margin-bottom:5px; }
            .subtitle { color:#6b7280; margin-bottom:20px; }
            .form-box { background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:20px; }
            label { display:block; margin-bottom:6px; font-size:14px; color:#374151; }
            input { width:100%; padding:10px; margin-bottom:15px; border:1px solid #e5e7eb; border-radius:6px; font-size:14px; }
            input:focus { outline:none; border-color:#2563eb; }
            .submit-btn { width:100%; background:#2563eb; color:#fff; padding:10px; border:none; border-radius:6px; font-size:14px; cursor:pointer; }
            .submit-btn:hover { background:#1d4ed8; }
            .back-link { display:inline-block; margin-top:15px; font-size:14px; color:#2563eb; text-decoration:none; }
        </style>
        </head>
        <body>
        <header>
            <a href="/" class="logo">SQLite CRUD</a>
            <nav>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/create">Add</a>
            </nav>
            <a href="/products" class="btn-primary">View Products</a>
        </header>
        <div class="container">
            <h1 class="page-title">Add New Product</h1>
            <p class="subtitle">Create a new product record (POST /products)</p>
            <div class="form-box">
            <form action="/products/new" method="POST">
                <label>Product Name</label>
                <input type="text" name="productName" placeholder="Enter product name" required />
                <label>Price</label>
                <input type="number" name="price" placeholder="Enter price" required />
                <button type="submit" class="submit-btn">Save Product</button>
            </form>
            </div>
            <a href="/products" class="back-link">← Back to Products List</a>
        </div>
        </body>
        </html>
        `
        res.send(addProduct)
})
router.post('/new', (req, res) => {
    const productName = req.body.productName
    const price = req.body.price
    const query = 'INSERT INTO products(productName, price) VALUES (?, ?)'
    db.run(query, [productName, price], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Inserted row ID:', this.lastID);
        res.redirect('/products')
    })
})
router.get('/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const query = `SELECT * FROM products WHERE productID = ${id}`
    db.all(query, [], (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Database Error')
        }
        const product = rows.map(p => {
            return `
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" name="productName" value="${p.productName}" required>
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" name="price" value="${p.price}" required>
            </div>          
            `
        }).join('')
        const updatePage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Update Product</title>
            <style>
            body { background:#f5f7fb; color:#1f2937; line-height:1.6; font-family:Arial,sans-serif; }
            header { background:#fff; padding:15px 40px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e5e7eb; position:sticky; top:0; }
            .logo { font-weight:bold; font-size:18px; color:#2563eb; text-decoration:none; }
            nav a { margin:0 10px; text-decoration:none; color:#1f2937; font-size:14px; }
            nav a:hover { color:#2563eb; }
            .btn-primary { background:#2563eb; color:#fff; padding:8px 14px; border-radius:6px; text-decoration:none; font-size:13px; }
            .container { max-width:600px; margin:40px auto; padding:0 20px; }
            .page-title { font-size:24px; margin-bottom:5px; }
            .subtitle { color:#6b7280; margin-bottom:20px; }
            .form-box { background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:20px; }
            .product-id { color:#6b7280; font-size:13px; margin-bottom:20px; }
            .form-group { margin-bottom:15px; }
            label { display:block; margin-bottom:6px; font-size:14px; color:#374151; }
            input { width:100%; padding:10px; border:1px solid #e5e7eb; border-radius:6px; font-size:14px; }
            input:focus { outline:none; border-color:#2563eb; }
            .actions { display:flex; gap:10px; margin-top:20px; }
            .save-btn { flex:1; background:#2563eb; color:#fff; padding:10px; border:none; border-radius:6px; font-size:14px; cursor:pointer; }
            .save-btn:hover { background:#1d4ed8; }
            .cancel-btn { flex:1; background:#fff; color:#374151; border:1px solid #e5e7eb; padding:10px; border-radius:6px; text-decoration:none; text-align:center; font-size:14px; }
            .cancel-btn:hover { background:#f9fafb; }
            </style>
            </head>
            <body>
            <header>
                <a href="/" class="logo">SQLite CRUD</a>
                <nav>
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/products/new">Add Product</a>
                </nav>
                <a href="/products" class="btn-primary">View Products</a>
            </header>
            <div class="container">
                <h1 class="page-title">Update Product</h1>
                <p class="subtitle">Modify an existing product record.</p>
                <div class="form-box">
                    <div class="product-id">Editing Product ID: ${id}</div>
                    <form action="/products/${id}/update" method="POST">
                        ${product}
                        <div class="actions">
                            <button type="submit" class="save-btn">Save Changes</button>
                            <a href="/products" class="cancel-btn">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
            </body>
            </html>
            `
        res.send(updatePage)
    })
})
router.post('/:id/update', (req, res) => {
    const productName = req.body.productName
    const price = Number(req.body.price)
    const id = Number(req.params.id)
    const query = `UPDATE products SET productName = ?, price = ? WHERE productID = ${id}`
    db.run(query, [productName, price], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error')
        }
        res.redirect('/products')
    })
})
module.exports = router