const axios = require('axios');
const cheerio = require('cheerio');
const { isAllowed } = require('../utils/robots');
const { getLimiter } = require('../utils/rateLimiter');

class BaseScraper {
    constructor(storeName, userAgent = 'PriceGlobeBot') {
        this.storeName = storeName;
        this.userAgent = userAgent;
    }

    async scrape(url, selectorMapping) {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;

        const allowed = await isAllowed(url, this.userAgent);
        if (!allowed) {
            throw new Error(`Scraping disallowed by robots.txt for ${url}`);
        }

        const limiter = getLimiter(domain);
        return limiter.schedule(async () => {
            console.log(`Scraping ${url}...`);
            const response = await axios.get(url, {
                headers: { 'User-Agent': this.userAgent }
            });
            const $ = cheerio.load(response.data);
            
            const result = {};
            for (const [key, selector] of Object.entries(selectorMapping)) {
                result[key] = $(selector).text().trim();
            }
            return result;
        });
    }
}

module.exports = BaseScraper;
