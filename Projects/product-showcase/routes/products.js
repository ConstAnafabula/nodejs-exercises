const express = require('express')
const router = express.Router()

const products = [
    { id: 1, name: 'Laptop Pro X', price: 999, icon: '💻', categoryId: 1, category: 'Electronics', stock: 12, description: 'High-performance laptop built for productivity and multitasking.', brand: 'Dell', processor: 'Intel i7', ram: '16GB', storage: '512GB SSD' },
    { id: 2, name: 'Gaming Laptop', price: 1299, icon: '🎮', categoryId: 1, category: 'Electronics', stock: 8, description: 'Powerful gaming laptop designed for AAA titles and smooth gameplay.', brand: 'ASUS', processor: 'Ryzen 9', ram: '32GB', storage: '1TB SSD' },
    { id: 3, name: 'Smartphone Ultra', price: 899, icon: '📱', categoryId: 1, category: 'Electronics', stock: 25, description: 'Flagship smartphone with advanced camera and fast performance.', brand: 'Samsung', storage: '256GB' },
    { id: 4, name: 'Budget Smartphone', price: 299, icon: '📱', categoryId: 1, category: 'Electronics', stock: 40, description: 'Affordable smartphone with essential features for everyday use.', brand: 'Xiaomi' },
    { id: 5, name: 'Tablet Air', price: 499, icon: '📟', categoryId: 1, category: 'Electronics', stock: 18, description: 'Lightweight tablet perfect for media consumption and light work.', brand: 'Apple', storage: '128GB' },
    { id: 6, name: 'Bluetooth Speaker', price: 89, icon: '🔊', categoryId: 1, category: 'Electronics', stock: 60, description: 'Portable speaker with clear sound and deep bass.', brand: 'JBL' },
    { id: 7, name: 'Smart TV 4K', price: 699, icon: '📺', categoryId: 1, category: 'Electronics', stock: 10, description: 'Ultra HD smart TV with vibrant colors and streaming apps support.', brand: 'LG' },
    { id: 8, name: 'Action Camera', price: 249, icon: '📷', categoryId: 1, category: 'Electronics', stock: 22, description: 'Rugged camera built for outdoor adventures.', brand: 'GoPro' },
    { id: 9, name: 'Digital Camera', price: 549, icon: '📸', categoryId: 1, category: 'Electronics', stock: 14, description: 'High-resolution camera for photography enthusiasts.', brand: 'Canon' },
    { id: 10, name: 'Drone Camera', price: 799, icon: '🚁', categoryId: 1, category: 'Electronics', stock: 6, description: 'Aerial drone with stabilized 4K camera.', brand: 'DJI' },
    { id: 11, name: 'Gaming Console', price: 499, icon: '🎮', categoryId: 1, category: 'Electronics', stock: 19, description: 'Next-gen console for immersive gaming experience.', brand: 'Sony' },
    { id: 12, name: 'Smart Home Hub', price: 129, icon: '🏠', categoryId: 1, category: 'Electronics', stock: 30, description: 'Control all smart devices from one hub.', brand: 'Google' },

    { id: 13, name: 'Wireless Headphones', price: 149, icon: '🎧', categoryId: 2, category: 'Accessories', stock: 35, description: 'Comfortable wireless headphones with noise isolation.', brand: 'Sony', battery: '30h' },
    { id: 14, name: 'Gaming Mouse', price: 59, icon: '🖱️', categoryId: 2, category: 'Accessories', stock: 80, description: 'High-precision mouse designed for gaming.', brand: 'Logitech' },
    { id: 15, name: 'Mechanical Keyboard', price: 99, icon: '⌨️', categoryId: 2, category: 'Accessories', stock: 50, description: 'Tactile mechanical keyboard for fast typing.', brand: 'Razer' },
    { id: 16, name: 'USB-C Hub', price: 39, icon: '🔌', categoryId: 2, category: 'Accessories', stock: 120, description: 'Expand connectivity with multiple ports.', brand: 'Anker' },
    { id: 17, name: 'Phone Case', price: 19, icon: '📱', categoryId: 2, category: 'Accessories', stock: 200, description: 'Protective case for smartphones.', brand: 'Spigen' },
    { id: 18, name: 'Screen Protector', price: 9, icon: '🪟', categoryId: 2, category: 'Accessories', stock: 300, description: 'Tempered glass screen protection.', brand: 'Generic' },
    { id: 19, name: 'Laptop Bag', price: 49, icon: '🎒', categoryId: 2, category: 'Accessories', stock: 70, description: 'Durable bag for laptops and accessories.', brand: 'Targus' },
    { id: 20, name: 'Power Bank', price: 29, icon: '🔋', categoryId: 2, category: 'Accessories', stock: 90, description: 'Portable charger for all devices.', brand: 'Anker', battery: '10000mAh' },

    { id: 21, name: 'Smart Watch Series 9', price: 399, icon: '⌚', categoryId: 3, category: 'Wearables', stock: 15, description: 'Advanced smartwatch with health tracking.', brand: 'Apple', battery: '18h', heartRate: 'Yes', waterResistant: 'Yes' },
    { id: 22, name: 'Fitness Tracker', price: 99, icon: '⌚', categoryId: 3, category: 'Wearables', stock: 45, description: 'Track daily activity and sleep.', brand: 'Fitbit', battery: '10 days', heartRate: 'Yes' },
    { id: 23, name: 'Smart Glasses', price: 299, icon: '🕶️', categoryId: 3, category: 'Wearables', stock: 12, description: 'Smart AR-enabled glasses.', brand: 'Meta' },
    { id: 24, name: 'Heart Rate Band', price: 79, icon: '❤️', categoryId: 3, category: 'Wearables', stock: 55, description: 'Accurate heart rate monitoring.', brand: 'Xiaomi', heartRate: 'Yes' },
    { id: 25, name: 'VR Headset', price: 499, icon: '🥽', categoryId: 3, category: 'Wearables', stock: 10, description: 'Immersive virtual reality experience.', brand: 'Meta' },
    { id: 26, name: 'Smart Ring', price: 199, icon: '💍', categoryId: 3, category: 'Wearables', stock: 20, description: 'Compact health tracking ring.', brand: 'Oura' },

    { id: 27, name: 'Gaming PC Ultra', price: 1499, icon: '🖥️', categoryId: 4, category: 'Computers', stock: 5, description: 'High-end gaming desktop PC.', brand: 'Custom', processor: 'i9', ram: '32GB', storage: '1TB SSD' },
    { id: 28, name: 'Workstation PC', price: 1299, icon: '🖥️', categoryId: 4, category: 'Computers', stock: 7, description: 'Professional workstation for heavy workloads.', brand: 'Dell', processor: 'Ryzen 9', ram: '64GB', storage: '2TB SSD' },
    { id: 29, name: 'Mini PC', price: 399, icon: '💻', categoryId: 4, category: 'Computers', stock: 25, description: 'Compact desktop for home use.', brand: 'Intel' },
    { id: 30, name: 'All-in-One PC', price: 899, icon: '🖥️', categoryId: 4, category: 'Computers', stock: 14, description: 'PC with built-in display.', brand: 'HP' },
    { id: 31, name: 'Gaming Monitor', price: 299, icon: '🖥️', categoryId: 4, category: 'Computers', stock: 40, description: 'High refresh rate monitor.', brand: 'ASUS' },
    { id: 32, name: '4K Monitor', price: 349, icon: '🖥️', categoryId: 4, category: 'Computers', stock: 30, description: 'Ultra HD display.', brand: 'LG' },
    { id: 33, name: 'External GPU', price: 599, icon: '⚡', categoryId: 4, category: 'Computers', stock: 9, description: 'Boost graphics performance.', brand: 'Razer' },
    { id: 34, name: 'SSD 1TB', price: 129, icon: '💾', categoryId: 4, category: 'Computers', stock: 100, description: 'Fast storage upgrade.', brand: 'Samsung' },
    { id: 35, name: 'RAM Kit 32GB', price: 159, icon: '🧠', categoryId: 4, category: 'Computers', stock: 85, description: 'High-speed memory kit.', brand: 'Corsair' }
];

const reviews = [
    { productId: 1, reviewer: "John Doe", rating: '★★★★★', date: "June 15, 2026", text: "Excellent laptop for programming and school work. Battery life is great and performance is smooth." },
    { productId: 1, reviewer: "Jane Smith", rating: '★★★★☆', date: "June 10, 2026", text: "Good value for the price. The screen is sharp and keyboard feels great." },
    { productId: 1, reviewer: "Mike Johnson", rating: '★★★★★', date: "June 8, 2026", text: "Fast and reliable for multitasking and development work." },
    { productId: 2, reviewer: "Alex Carter", rating: '★★★★★', date: "June 12, 2026", text: "Insane gaming performance, runs all AAA games smoothly." },
    { productId: 2, reviewer: "Sarah Lee", rating: '★★★★☆', date: "June 9, 2026", text: "Great gaming laptop but a bit heavy for travel." },
    { productId: 3, reviewer: "Daniel Kim", rating: '★★★★★', date: "June 14, 2026", text: "Camera quality is outstanding, very fast phone." },
    { productId: 3, reviewer: "Emma Brown", rating: '★★★★☆', date: "June 11, 2026", text: "Smooth performance but battery drains slightly fast." },
    { productId: 4, reviewer: "Chris Evans", rating: '★★★★☆', date: "June 10, 2026", text: "Affordable and decent for daily use." },
    { productId: 5, reviewer: "Olivia Wilson", rating: '★★★★★', date: "June 13, 2026", text: "Perfect tablet for reading and media." },
    { productId: 6, reviewer: "James Miller", rating: '★★★★☆', date: "June 7, 2026", text: "Good sound for its size." },
    { productId: 7, reviewer: "Sophia Davis", rating: '★★★★★', date: "June 6, 2026", text: "Amazing 4K display, very crisp visuals." },
    { productId: 8, reviewer: "Liam Garcia", rating: '★★★★★', date: "June 5, 2026", text: "Perfect for outdoor shooting and sports." },
    { productId: 9, reviewer: "Noah Martinez", rating: '★★★★★', date: "June 4, 2026", text: "Professional-level photography quality." },
    { productId: 10, reviewer: "Isabella Rodriguez", rating: '★★★★★', date: "June 3, 2026", text: "Drone is stable and camera is very sharp." },
    { productId: 11, reviewer: "Ethan Anderson", rating: '★★★★★', date: "June 2, 2026", text: "Best gaming console experience so far." },
    { productId: 12, reviewer: "Mia Thomas", rating: '★★★★☆', date: "June 1, 2026", text: "Useful for smart home automation." },
    { productId: 13, reviewer: "Ava Jackson", rating: '★★★★★', date: "June 15, 2026", text: "Very comfortable headphones with great battery life." },
    { productId: 14, reviewer: "Lucas White", rating: '★★★★☆', date: "June 12, 2026", text: "Great mouse for competitive gaming." },
    { productId: 15, reviewer: "Henry Harris", rating: '★★★★★', date: "June 11, 2026", text: "Mechanical keyboard feels amazing to type on." },
    { productId: 16, reviewer: "Jack Martin", rating: '★★★★☆', date: "June 10, 2026", text: "Very useful hub for laptops." },
    { productId: 17, reviewer: "Ella Thompson", rating: '★★★★★', date: "June 9, 2026", text: "Perfect fit and good protection." },
    { productId: 18, reviewer: "Grace Lee", rating: '★★★★☆', date: "June 8, 2026", text: "Screen protector works as expected." },
    { productId: 19, reviewer: "Benjamin Scott", rating: '★★★★★', date: "June 7, 2026", text: "Strong and durable laptop bag." },
    { productId: 20, reviewer: "David Young", rating: '★★★★★', date: "June 6, 2026", text: "Power bank charges fast and lasts long." },
    { productId: 21, reviewer: "Sophia Clark", rating: '★★★★★', date: "June 15, 2026", text: "Best smartwatch I’ve used so far." },
    { productId: 22, reviewer: "James Lewis", rating: '★★★★☆', date: "June 14, 2026", text: "Very accurate fitness tracking." },
    { productId: 23, reviewer: "Emily Walker", rating: '★★★★☆', date: "June 13, 2026", text: "Cool concept but still improving." },
    { productId: 24, reviewer: "Daniel Hall", rating: '★★★★★', date: "June 12, 2026", text: "Heart rate tracking is very accurate." },
    { productId: 25, reviewer: "Matthew Allen", rating: '★★★★★', date: "June 11, 2026", text: "VR experience is immersive and fun." },
    { productId: 26, reviewer: "Zoe King", rating: '★★★★☆', date: "June 10, 2026", text: "Nice wearable, very lightweight." },
    { productId: 27, reviewer: "Ryan Wright", rating: '★★★★★', date: "June 9, 2026", text: "Insane gaming performance, no lag at all." },
    { productId: 28, reviewer: "Nathan Lopez", rating: '★★★★★', date: "June 8, 2026", text: "Perfect for heavy professional workloads." },
    { productId: 29, reviewer: "Christian Hill", rating: '★★★★☆', date: "June 7, 2026", text: "Small but powerful for its size." },
    { productId: 30, reviewer: "Aaron Green", rating: '★★★★☆', date: "June 6, 2026", text: "Clean all-in-one setup." },
    { productId: 31, reviewer: "Samuel Adams", rating: '★★★★★', date: "June 5, 2026", text: "Smooth gaming monitor experience." },
    { productId: 32, reviewer: "Luke Baker", rating: '★★★★★', date: "June 4, 2026", text: "4K display is super sharp." },
    { productId: 33, reviewer: "Paul Nelson", rating: '★★★★☆', date: "June 3, 2026", text: "Noticeable GPU performance boost." },
    { productId: 34, reviewer: "Andrew Carter", rating: '★★★★★', date: "June 2, 2026", text: "SSD is extremely fast." },
    { productId: 35, reviewer: "Justin Mitchell", rating: '★★★★★', date: "June 1, 2026", text: "RAM upgrade made a huge difference." }
];

router.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next()
})
router.get('/', (req, res) => {
    const product = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price}</div>
                <a href="/products/${product.id}" class="view-btn">View Details</a>
            </div>
        </div>
        `).join('')
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
                        ${product}
                    </div>
                </div>
                </body>
                </html>
                `
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
                                    ${product.id ? `<li><strong>ID:</strong> ${product.id}</li>` : ''}                                    
                                    ${product.brand ? `<li><strong>Brand:</strong> ${product.brand}</li>` : ''}
                                    ${product.processor ? `<li><strong>Processor:</strong> ${product.processor}</li>` : ''}
                                    ${product.ram ? `<li><strong>RAM:</strong> ${product.ram}</li>` : ''}
                                    ${product.storage ? `<li><strong>Storage:</strong> ${product.storage}</li>` : ''}
                                    ${product.stock ? `<li><strong>Stock:</strong> ${product.stock}</li>` : ''}
                                    ${product.category ? `<li><strong>Category:</strong> ${product.category}</li>` : ''}
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
    const product = products.find(product => product.id === id)
    const reviewSection = reviews.filter(review => review.productId === id).map(review => `
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
                        <a href="/products/${product.id}" class="back-btn">← Back to Product</a>
                        <div class="header">
                            <h1 class="product-name">${product.name}</h1>
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
module.exports = {
    router,
    products
}