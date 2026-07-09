const httpClient = require("../services/httpClient");
const companyCache = new Map();

const getCompanyProfile = async (symbol) => {

    // Check cache first
    if (companyCache.has(symbol)) {
        console.log(`✅ Company Profile Cache Hit: ${symbol}`);
        return companyCache.get(symbol);
    }

    console.log(`🌐 Fetching Company Profile: ${symbol}`);

    const { data } = await httpClient.get("/stock/profile2", {
        params: {
            symbol,
            token: process.env.FINNHUB_API_KEY
        }
    });

    const profile = {
        name: data.name,
        ticker: data.ticker,
        industry: data.finnhubIndustry,
        country: data.country,
        currency: data.currency,
        exchange: data.exchange,
        ipo: data.ipo,
        marketCap: data.marketCapitalization,
        website: data.weburl
    };

    // Save in cache
    companyCache.set(symbol, profile);

    return profile;
};

module.exports = {
    getCompanyProfile
};