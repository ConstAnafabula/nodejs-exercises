const express = require('express')
const router = express.Router()
const {products: arrProducts} = require('./products')

router.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next()
})

const categories = [
  { id: 1, name: "Electronics", icon: "💻", description: "Laptops, smartphones, tablets, and other electronic devices.", productCount: 12 },
  { id: 2, name: "Accessories", icon: "🎧", description: "Headphones, chargers, cables, and daily tech accessories.", productCount: 8 },
  { id: 3, name: "Wearables", icon: "⌚", description: "Smart watches, fitness bands, and wearable technology.", productCount: 6 },
  { id: 4, name: "Computers", icon: "🖥️", description: "Desktop computers, monitors, and PC components.", productCount: 9 }
];

router.get('/', (req, res) => {
    const category = categories.map(category => `
        <div class="category-card">
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-description">${category.description}</div>
            <div class="category-count">${category.productCount} Products</div>
            <a href="/categories/${category.id}" class="view-btn">View Category</a>
        </div>
        `).join('')
    const categoryPage = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Categories</title>
                        <style>
                            * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                            body { background-color: #f4f4f4; padding: 40px; }
                            .container { max-width: 1000px; margin: auto; }
                            .back-btn { display: inline-block; text-decoration: none; background: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; }
                            .back-btn:hover { background: #555; }
                            h1 { text-align: center; margin-bottom: 30px; }
                            .categories-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px; }
                            .category-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: 0.2s ease; }
                            .category-card:hover { transform: translateY(-5px); box-shadow: 0 6px 18px rgba(0,0,0,0.15); }
                            .category-icon { font-size: 50px; margin-bottom: 15px; }
                            .category-name { font-size: 22px; font-weight: bold; margin-bottom: 10px; }
                            .category-description { color: #666; line-height: 1.5; margin-bottom: 15px; }
                            .category-count { color: #777; font-size: 14px; margin-bottom: 15px; }
                            .view-btn { display: inline-block; text-decoration: none; background: #2563eb; color: white; padding: 10px 14px; border-radius: 6px; }
                            .view-btn:hover { background: #1d4ed8; }
                        </style>
                        </head>
                        <body>
                            <div class="container">
                                <a href="/" class="back-btn">← Home</a>
                                <h1>Product Categories</h1>
                                <div class="categories-container">
                                    ${category}
                                </div>
                            </div>
                        </body>
                        </html>
                        `
    res.send(categoryPage)
})
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const category = categories.find(category => category.id === id)
    const product = arrProducts.filter(product => product.categoryId === id).map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price}</div>
                <a href="/products/${product.id}" class="view-btn">View Product</a>
            </div>
        </div>
        `).join('')
    const categoryProducts = `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Category</title>
                            <style>
                                * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                                body { background-color: #f4f4f4; padding: 40px; }
                                .container { max-width: 1000px; margin: auto; }
                                .back-btn { display: inline-block; text-decoration: none; background: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; }
                                .back-btn:hover { background: #555; }
                                .category-header { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 25px; }
                                .category-title { font-size: 32px; margin-bottom: 8px; }
                                .category-desc { color: #666; margin-bottom: 10px; line-height: 1.5; }
                                .category-count { color: #777; font-size: 14px; }
                                .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
                                .product-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: 0.2s ease; }
                                .product-card:hover { transform: translateY(-5px); box-shadow: 0 6px 18px rgba(0,0,0,0.15); }
                                .product-image { height: 160px; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 50px; }
                                .product-info { padding: 15px; }
                                .product-name { font-size: 18px; font-weight: bold; margin-bottom: 8px; }
                                .product-description { color: #666; font-size: 14px; margin-bottom: 10px; }
                                .product-price { color: #28a745; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                                .view-btn { display: inline-block; text-decoration: none; background: #2563eb; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
                                .view-btn:hover { background: #1d4ed8; }
                            </style>
                            </head>
                            <body>
                                <div class="container">
                                    <a href="/categories" class="back-btn">← Back to Categories</a>
                                    <div class="category-header">
                                        <div class="category-title">${category.name}</div>
                                        <div class="category-desc">${category.description}</div>
                                        <div class="category-count">${category.productCount} Products</div>
                                    </div>
                                    <div class="products-grid">
                                        ${product}
                                    </div>
                                </div>
                            </body>
                            </html>
                            `
    res.send(categoryProducts)
})

module.exports = router