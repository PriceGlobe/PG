const axios = require('axios');
const robotsParser = require('robots-parser');

const robotsCache = {};

async function isAllowed(url, userAgent = 'PriceGlobeBot') {
    try {
        const urlObj = new URL(url);
        const robotsUrl = `${urlObj.protocol}//${urlObj.host}/robots.txt`;

        if (!robotsCache[robotsUrl]) {
            const response = await axios.get(robotsUrl);
            robotsCache[robotsUrl] = robotsParser(robotsUrl, response.data);
        }

        return robotsCache[robotsUrl].isAllowed(url, userAgent);
    } catch (error) {
        console.error(`Error checking robots.txt for ${url}:`, error.message);
        // If we can't get robots.txt, default to allowed but proceed with caution
        return true;
    }
}

module.exports = { isAllowed };
