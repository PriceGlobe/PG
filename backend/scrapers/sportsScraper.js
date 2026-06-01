const BaseScraper = require('./baseScraper');

class SportsScraper extends BaseScraper {
    constructor() {
        super('SportsStore');
    }

    async getPrice(url) {
        const selectorMapping = {
            name: 'h1.product-title',
            price: '.price-tag',
            currency: '.currency-symbol'
        };
        return this.scrape(url, selectorMapping);
    }
}

module.exports = SportsScraper;
