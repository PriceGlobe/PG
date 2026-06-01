const db = require('../db');
const MockScraper = require('../scrapers/mockScraper');
// In a real app, we would import real scrapers
// const SportsScraper = require('../scrapers/sportsScraper');

class ScrapingService {
    constructor() {
        this.mockScraper = new MockScraper();
    }

    async scrapeProduct(productId, storeId, url, category) {
        try {
            // Check if store exists
            const store = db.prepare('SELECT * FROM stores WHERE id = ?').get(storeId);
            if (!store) throw new Error('Store not found');

            // Scrape data (using mock for now)
            const scrapedData = await this.mockScraper.scrape(url, category);

            // Update database
            const insertPrice = db.prepare(`
                INSERT INTO price_listings (product_id, store_id, price, currency, url, scraped_at)
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `);
            
            insertPrice.run(productId, storeId, scrapedData.price, scrapedData.currency, url);

            return { success: true, data: scrapedData };
        } catch (error) {
            console.error('Error in ScrapingService:', error.message);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new ScrapingService();
