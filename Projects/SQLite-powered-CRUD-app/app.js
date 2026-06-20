const express = require('express')
const app = express()
const productsRouter = require('./router/products')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next()
})
app.use('/products', productsRouter)

app.get('/', (req, res) => {
    const homepage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>SQLite CRUD Manager</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
            body { background: #f5f7fb; color: #1f2937; line-height: 1.6; }
            header { background: #ffffff; padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 1000; }
            .logo { font-weight: bold; font-size: 18px; color: #2563eb; }
            nav a { margin: 0 10px; text-decoration: none; color: #374151; font-size: 14px; transition: 0.2s; }
            nav a:hover { color: #2563eb; }
            .nav-cta { background: #2563eb; color: white; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 13px; }
            .nav-cta:hover { background: #1d4ed8; }
            .hero { text-align: center; padding: 80px 20px; background: linear-gradient(to right, #e0e7ff, #f0f9ff); }
            .hero h1 { font-size: 32px; margin-bottom: 10px; }
            .hero p { max-width: 600px; margin: 0 auto 20px; color: #4b5563; }
            .btn-group { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
            .btn { padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 14px; transition: 0.2s; }
            .btn-primary { background: #2563eb; color: white; }
            .btn-primary:hover { background: #1d4ed8; }
            .btn-outline { border: 1px solid #2563eb; color: #2563eb; }
            .btn-outline:hover { background: #2563eb; color: white; }
            .section { padding: 60px 20px; max-width: 1100px; margin: auto; }
            .section h2 { text-align: center; margin-bottom: 30px; font-size: 24px; }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
            .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.05); text-align: center; transition: 0.2s; }
            .card:hover { transform: translateY(-5px); }
            .card h3 { margin-bottom: 10px; font-size: 16px; }
            .card p { font-size: 13px; color: #6b7280; }
            .nav-cards a { display: block; text-decoration: none; color: inherit; }
            .nav-card { cursor: pointer; }
            .stats { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
            .stat-box { background: white; padding: 20px; border-radius: 10px; width: 180px; text-align: center; box-shadow: 0 3px 10px rgba(0,0,0,0.05); }
            .stat-box h3 { font-size: 20px; color: #2563eb; }
            .stat-box p { font-size: 13px; color: #6b7280; }
            footer { text-align: center; padding: 20px; background: #ffffff; margin-top: 40px; font-size: 13px; color: #6b7280; }
            @media (max-width: 600px) { header { flex-direction: column; gap: 10px; } .hero h1 { font-size: 24px; } }
        </style>
        </head>
        <body>
        <header>
            <div class="logo">SQLite CRUD Manager</div>
            <nav>
            <a href="#">Home</a>
            <a href="/products">Products</a>
            </nav>
            <a class="nav-cta" href="/read">Go to Dashboard</a>
        </header>
        <section class="hero">
            <h1>Simple SQLite CRUD Management System</h1>
            <p>A beginner-friendly tool to manage and organize data using Node.js and SQLite. Navigate easily to add, view, update, and delete records.</p>
            <div class="btn-group">
            <a class="btn btn-primary" href="/read">Start Managing Data</a>
            <a class="btn btn-outline" href="#features">View Features</a>
            </div>
        </section>
        <section class="section" id="features">
            <h2>What This App Can Do</h2>
            <div class="grid">
            <div class="card">
                <h3>📦 Manage Products</h3>
                <p>Organize inventory data in a structured SQLite database.</p>
            </div>
            <div class="card">
                <h3>📊 View Records</h3>
                <p>Browse all stored items in a clean table format.</p>
            </div>
            <div class="card">
                <h3>✏️ Update Data</h3>
                <p>Modify existing records easily and efficiently.</p>
            </div>
            <div class="card">
                <h3>🗑️ Delete Records</h3>
                <p>Remove unwanted data with confirmation safety.</p>
            </div>
            </div>
        </section>
        <section class="section">
            <h2>Quick Navigation</h2>
            <div class="grid nav-cards">
            <a href="/create">
                <div class="card nav-card">
                <h3>➕ Add Item</h3>
                <p>Create new records in your database</p>
                </div>
            </a>
            <a href="/read">
                <div class="card nav-card">
                <h3>📋 View Items</h3>
                <p>See all stored data entries</p>
                </div>
            </a>
            <a href="/update">
                <div class="card nav-card">
                <h3>✏️ Edit Items</h3>
                <p>Update existing records</p>
                </div>
            </a>
            <a href="/delete">
                <div class="card nav-card">
                <h3>🗑️ Delete Items</h3>
                <p>Remove records safely</p>
                </div>
            </a>
            </div>
        </section>
        <section class="section">
            <h2>System Overview</h2>
            <div class="stats">
            <div class="stat-box">
                <h3>--</h3>
                <p>Total Items</p>
            </div>
            <div class="stat-box">
                <h3>--</h3>
                <p>Categories</p>
            </div>
            <div class="stat-box">
                <h3>--</h3>
                <p>Last Updated</p>
            </div>
            </div>
        </section>
        <footer>SQLite CRUD App • Built with Node.js + Express + SQLite • Beginner Project</footer>
        </body>
        </html>
        `
    res.send(homepage)
})

app.listen(3000, () => {
    console.log('Status: Running')
})