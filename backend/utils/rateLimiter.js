const Bottleneck = require('bottleneck');

// Default rate limiter: 1 request per 2 seconds per domain
const limiters = {};

function getLimiter(domain) {
    if (!limiters[domain]) {
        limiters[domain] = new Bottleneck({
            minTime: 2000,
            maxConcurrent: 1
        });
    }
    return limiters[domain];
}

module.exports = { getLimiter };
