const express = require('express')
const app = express()
const productRouter = require('./routes/products')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', productRouter)

const homepage = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Home</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                    body { background: #f5f7fb; color: #111827; }
                    .hero { background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 80px 20px; text-align: center; }
                    .hero h1 { font-size: 48px; margin-bottom: 12px; }
                    .hero p { font-size: 18px; max-width: 650px; margin: auto; opacity: 0.95; line-height: 1.6; }
                    .btn { display: inline-block; margin-top: 20px; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: 0.2s ease; }
                    .btn-primary { background: white; color: #1e40af; }
                    .btn-primary:hover { background: #e5e7eb; }
                    .section { max-width: 1100px; margin: 50px auto; padding: 0 20px; }
                    .section h2 { text-align: center; margin-bottom: 30px; font-size: 26px; }
                    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
                    .card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: 0.2s ease; text-align: center; }
                    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.12); }
                    .icon { font-size: 44px; margin-bottom: 10px; }
                    .card h3 { margin-bottom: 8px; font-size: 18px; }
                    .card p { color: #6b7280; font-size: 14px; line-height: 1.5; }
                    .footer { text-align: center; padding: 30px; color: #6b7280; font-size: 14px; }
                </style>
                </head>
                <body>
                <div class="hero">
                    <h1>Product Showcase</h1>
                    <p>Explore a simple catalog of products with full specifications and detailed views. Built using Express, HTML, and clean routing structure.</p>
                    <a href="/products" class="btn btn-primary">Browse Products</a>
                </div>
                <div class="section">
                    <h2>What You Can Explore</h2>
                    <div class="grid">
                        <div class="card">
                            <div class="icon">💻</div>
                            <h3>Electronics</h3>
                            <p>Laptops, smartphones, and high-performance devices.</p>
                        </div>
                        <div class="card">
                            <div class="icon">🎧</div>
                            <h3>Accessories</h3>
                            <p>Headphones, smart watches, and wearable tech.</p>
                        </div>
                        <div class="card">
                            <div class="icon">⚡</div>
                            <h3>Performance Specs</h3>
                            <p>See RAM, storage, processors, and full device specs.</p>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    Simple Product System • Built with Express + HTML
                </div>
                </body>
                </html>
                `
                
app.get('/', (req, res) => {
    res.send(homepage)
})

app.listen(3000, () => {
    console.log('Status: Running');  
})