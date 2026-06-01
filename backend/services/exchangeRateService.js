const db = require('../db');
const axios = require('axios');

class ExchangeRateService {
    async getRate(from, to) {
        if (from === to) return 1;

        // Try to get from database first
        const cached = db.prepare('SELECT rate FROM exchange_rates WHERE from_currency = ? AND to_currency = ?').get(from, to);
        if (cached && (Date.now() - new Date(cached.updated_at).getTime() < 24 * 60 * 60 * 1000)) {
            return cached.rate;
        }

        // Mock external API call
        const mockRates = {
            'USD_EUR': 0.92,
            'EUR_USD': 1.09,
            'GBP_EUR': 1.17,
            'EUR_GBP': 0.85,
            'USD_GBP': 0.79,
            'GBP_USD': 1.27
        };

        const pair = `${from}_${to}`;
        const rate = mockRates[pair] || 1;

        // Save to database
        db.prepare(`
            INSERT INTO exchange_rates (from_currency, to_currency, rate, updated_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(from_currency, to_currency) DO UPDATE SET rate=excluded.rate, updated_at=excluded.updated_at
        `).run(from, to, rate);

        return rate;
    }
}

module.exports = new ExchangeRateService();
