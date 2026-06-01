const db = require('./db');
const exchangeRateService = require('./exchangeRateService');

class PriceComparisonService {
    async compare(productId, targetCurrency = 'USD') {
        const listings = db.prepare(`
            SELECT p.*, s.name as store_name, s.country, s.city, s.rating, s.base_currency
            FROM price_listings p
            JOIN stores s ON p.store_id = s.id
            WHERE p.product_id = ?
        `).all(productId);

        const results = await Promise.all(listings.map(async (listing) => {
            const rate = await exchangeRateService.getRate(listing.currency, targetCurrency);
            const convertedPrice = listing.price * rate;
            
            // Landed Cost Calculation (Placeholder Logic)
            // In a real app, this would involve complex shipping/duty API calls
            let shippingEstimate = 0;
            let dutyEstimate = 0;

            if (listing.country !== 'USA' && targetCurrency === 'USD') {
                shippingEstimate = 15.00; // Flat $15 for international
                dutyEstimate = convertedPrice * 0.05; // 5% duty placeholder
            }

            const totalLandedCost = convertedPrice + shippingEstimate + dutyEstimate;

            return {
                ...listing,
                convertedPrice,
                targetCurrency,
                shippingEstimate,
                dutyEstimate,
                totalLandedCost,
                affiliateUrl: this.generateAffiliateLink(listing.url, listing.store_name)
            };
        }));

        // Sort by total landed cost
        results.sort((a, b) => a.totalLandedCost - b.totalLandedCost);

        // Mark the lowest
        if (results.length > 0) {
            results[0].isLowest = true;
        }

        return results;
    }

    generateAffiliateLink(url, storeName) {
        // Skimlinks/Impact placeholder
        // Usually involves wrapping the URL with an affiliate ID
        return `https://go.skimlinks.com?id=PRICEGLOBE&url=${encodeURIComponent(url)}`;
    }
}

module.exports = new PriceComparisonService();
