class MockScraper {
    constructor(storeName) {
        this.storeName = storeName;
    }

    async scrape(url, category) {
        console.log(`Mock scraping ${url} for category ${category}...`);
        
        const mockData = {
            sports: { price: 49.99, currency: 'USD', name: 'Mock Kettlebell' },
            gas: { price: 1.85, currency: 'EUR', name: 'Mock Petrol' },
            groceries: { price: 0.99, currency: 'GBP', name: 'Mock Bread' }
        };

        return mockData[category] || { price: 0, currency: 'USD', name: 'Unknown' };
    }
}

module.exports = MockScraper;
