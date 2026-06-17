const express = require('express')
const router = express.Router()

const productPage = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Products</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                    body { background-color: #f4f4f4; padding: 40px; }
                    .container { max-width: 1000px; margin: auto; }
                    .back-btn { display: inline-block; text-decoration: none; background-color: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; }
                    .back-btn:hover { background-color: #555; }
                    h1 { text-align: center; margin-bottom: 30px; }
                    .products-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
                    .product-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.2s; }
                    .product-card:hover { transform: translateY(-5px); }
                    .product-image { width: 100%; height: 180px; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 50px; }
                    .product-info { padding: 15px; }
                    .product-name { font-size: 18px; font-weight: bold; margin-bottom: 8px; }
                    .product-description { color: #666; font-size: 14px; margin-bottom: 12px; }
                    .product-price { font-size: 20px; color: #28a745; font-weight: bold; margin-bottom: 12px; }
                    .view-btn { display: inline-block; text-decoration: none; background-color: #007bff; color: white; padding: 8px 12px; border-radius: 5px; font-size: 14px; }
                    .view-btn:hover { background-color: #0056b3; }
                </style>
                </head>
                <body>
                <div class="container">
                    <a href="/" class="back-btn">← Back</a>
                    <h1>Products</h1>
                    <div class="products-container">
                        <div class="product-card">
                            <div class="product-image">💻</div>
                            <div class="product-info">
                                <div class="product-name">Laptop</div>
                                <div class="product-description">High-performance laptop for work and study.</div>
                                <div class="product-price">$799</div>
                                <a href="/products/1" class="view-btn">View Details</a>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">📱</div>
                            <div class="product-info">
                                <div class="product-name">Smartphone</div>
                                <div class="product-description">Latest smartphone with amazing camera.</div>
                                <div class="product-price">$599</div>
                                <a href="/products/2" class="view-btn">View Details</a>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">🎧</div>
                            <div class="product-info">
                                <div class="product-name">Headphones</div>
                                <div class="product-description">Wireless noise-cancelling headphones.</div>
                                <div class="product-price">$149</div>
                                <a href="/products/3" class="view-btn">View Details</a>
                            </div>
                        </div>
                        <div class="product-card">
                            <div class="product-image">⌚</div>
                            <div class="product-info">
                                <div class="product-name">Smart Watch</div>
                                <div class="product-description">Track fitness and notifications on the go.</div>
                                <div class="product-price">$199</div>
                                <a href="/products/4" class="view-btn">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
                </html>
                `
const products = [{ id: 1, icon: '💻', name: 'Laptop', price: 799, description: 'A high-performance laptop designed for students, professionals, and everyday users.', brand: 'Dell', processor: 'Intel Core i7', ram: '16GB', storage: '512GB SSD', stock: 15, category: 'Electronics' }, { id: 2, icon: '📱', name: 'Smartphone', price: 599, description: 'Latest smartphone with an amazing camera and fast performance.', brand: 'Samsung', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', stock: 20, category: 'Electronics' }, { id: 3, icon: '🎧', name: 'Headphones', price: 149, description: 'Wireless noise-cancelling headphones for music and calls.', brand: 'Sony', processor: 'N/A', ram: 'N/A', storage: 'N/A', stock: 42, category: 'Accessories' }, { id: 4, icon: '⌚', name: 'Smart Watch', price: 199, description: 'Track fitness, heart rate, and notifications on the go.', brand: 'Apple', processor: 'S9 Chip', ram: '2GB', storage: '64GB', stock: 18, category: 'Wearables' } ];
const reviews = [{ id: 1, reviewer: "John Doe", rating: '★★★★★', date: "June 15, 2026", text: "Excellent laptop for programming and school work. Battery life is great and performance is smooth." }, { id: 1, reviewer: "Jane Smith", rating: '★★★★☆', date: "June 10, 2026", text: "Good value for the price. The screen is sharp and the keyboard feels comfortable to type on." }, { id: 1, reviewer: "Mike Johnson", rating: '★★★★★', date: "June 8, 2026", text: "Fast boot times and handles multiple applications without any issues. Highly recommended." }, { id: 2, reviewer: "Alex Carter", rating: '★★★★★', date: "June 12, 2026", text: "Amazing camera quality and super fast performance. Best phone I’ve used so far." }, { id: 2, reviewer: "Sarah Lee", rating: '★★★★☆', date: "June 9, 2026", text: "Very smooth experience, but battery could last a bit longer." }, { id: 3, reviewer: "Chris Evans", rating: '★★★★★', date: "June 5, 2026", text: "Sound quality is top-notch and noise cancellation works perfectly." }, { id: 4, reviewer: "Emma Watson", rating: '★★★★★', date: "June 3, 2026", text: "Great fitness tracking features and very comfortable to wear all day." }];
router.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next()
})
router.get('/', (req, res) => {
    res.send(productPage)
})
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = products.find(product => product.id === id)
    const productID = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Product Details</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                        body { background-color: #f4f4f4; padding: 40px; }
                        .back-btn { display: inline-block; text-decoration: none; background-color: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; }
                        .back-btn:hover { background-color: #555; }
                        .product-details { background: white; border-radius: 10px; padding: 30px; display: flex; gap: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                        .product-image { width: 300px; height: 300px; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 100px; border-radius: 10px; flex-shrink: 0; }
                        .product-info { flex: 1; }
                        .product-name { font-size: 32px; margin-bottom: 10px; }
                        .product-price { font-size: 28px; color: #28a745; font-weight: bold; margin-bottom: 20px; }
                        .product-description { color: #555; line-height: 1.6; margin-bottom: 20px; }
                        .details-list { list-style: none; }
                        .details-list li { margin-bottom: 10px; padding: 10px; background: #f8f8f8; border-radius: 5px; }
                        .action-btn { display: inline-block; margin-top: 20px; text-decoration: none; background: #007bff; color: white; padding: 12px 18px; border-radius: 6px; }
                        .action-btn:hover { background: #0056b3; }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <a href="/products" class="back-btn">← Back to Products</a>
                        <div class="product-details">
                            <div class="product-image">${product.icon}</div>
                            <div class="product-info">
                                <h1 class="product-name">${product.name}</h1>
                                <div class="product-price">$${product.price}</div>
                                <p class="product-description">${product.description}</p>
                                <ul class="details-list">
                                    <li><strong>Brand:</strong> ${product.brand}</li>
                                    <li><strong>Processor:</strong> ${product.processor}</li>
                                    <li><strong>RAM:</strong> ${product.ram}</li>
                                    <li><strong>Storage:</strong> ${product.storage}</li>
                                    <li><strong>Stock:</strong> ${product.stock}</li>
                                    <li><strong>Category:</strong> ${product.category}</li>
                                </ul>
                                <a href="/products/${product.id}/reviews/?id=${product.id}" class="action-btn">View Reviews</a>
                            </div>
                        </div>
                    </div>
                    </body>
                    </html>
    `
    res.send(productID)
})
router.get('/:id/reviews', (req, res) => {
    const id = Number(req.query.id)
    const reviewSection = reviews.filter(review => review.id === id).map(review => `
                            <div class="review-card">
                                <div class="review-header">
                                    <span class="reviewer">${review.reviewer}</span>
                                    <span class="review-stars">${review.rating}</span>
                                </div>
                                <div class="review-date">${review.date}</div>
                                <p class="review-text">${review.text}</p>
                            </div>
        `).join('')
    const reviewsUI = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Product Reviews</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                        body { background-color: #f4f4f4; padding: 40px; }
                        .container { max-width: 900px; margin: auto; }
                        .back-btn { display: inline-block; text-decoration: none; background-color: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; transition: 0.2s ease; }
                        .back-btn:hover { background-color: #555; transform: translateY(-2px); }
                        .header { background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                        .product-name { font-size: 32px; margin-bottom: 10px; }
                        .rating { font-size: 20px; color: #f5b301; }
                        .reviews-container { display: flex; flex-direction: column; gap: 15px; }
                        .review-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: 0.2s ease; cursor: pointer; }
                        .review-card:hover { transform: translateY(-5px); box-shadow: 0 6px 18px rgba(0,0,0,0.15); }
                        .review-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
                        .reviewer { font-weight: bold; }
                        .review-stars { color: #f5b301; }
                        .review-date { color: #777; font-size: 14px; }
                        .review-text { color: #555; line-height: 1.5; margin-top: 10px; }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <a href="/products/1" class="back-btn">← Back to Product</a>
                        <div class="header">
                            <h1 class="product-name">Laptop Reviews</h1>
                            <div class="rating">★★★★☆ 4.5/5 (24 Reviews)</div>
                        </div>
                        <div class="reviews-container">
                            ${reviewSection}
                        </div>
                    </div>
                    </body>
                    </html>
                    `
    res.send(reviewsUI)
})
module.exports = router