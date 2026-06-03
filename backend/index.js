require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const priceComparisonService = require('./services/priceComparisonService');

// API Routes
app.get('/api/products', (req, res) => {
    const { category, q } = req.query;
    let query = 'SELECT * FROM products';
    let params = [];

    if (category || q) {
        query += ' WHERE 1=1';
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        if (q) {
            query += ' AND name LIKE ?';
            params.push(`%${q}%`);
        }
    }

    const products = db.prepare(query).all(...params);
    res.json(products);
});

app.get('/api/prices/:productId', async (req, res) => {
    const { productId } = req.params;
    const { currency } = req.query;

    try {
        const prices = await priceComparisonService.compare(productId, currency || 'USD');
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/search', async (req, res) => {
    const { q, category } = req.query;
    // Simple search that returns products and their best prices
    let query = 'SELECT * FROM products';
    let params = [];

    if (category || q) {
        query += ' WHERE 1=1';
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        if (q) {
            query += ' AND name LIKE ?';
            params.push(`%${q}%`);
        }
    }

    const products = db.prepare(query).all(...params);
    
    const results = await Promise.all(products.map(async (product) => {
        const prices = await priceComparisonService.compare(product.id, 'USD');
        return {
            ...product,
            best_price: prices.length > 0 ? prices[0] : null
        };
    }));

    res.json(results);
});

const scrapingService = require('./services/scrapingService');

// API Routes

// Mock scrape trigger
app.post('/api/scrape', async (req, res) => {
    const { productId, url, storeId, category } = req.body;
    
    const result = await scrapingService.scrapeProduct(productId, storeId, url, category);
    
    if (result.success) {
        res.json({ message: 'Scrape successful', data: result.data });
    } else {
        res.status(500).json({ message: 'Scrape failed', error: result.error });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server listening at http://0.0.0.0:${port}`);
});
