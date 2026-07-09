const httpClient = require("../services/httpClient");

// Cache for company symbols
const searchCache = new Map();

const searchCompany = async (companyName) => {

    const key = companyName.trim().toUpperCase();

    // Check cache
    if (searchCache.has(key)) {
        console.log(`✅ Search Cache Hit: ${key}`);
        return searchCache.get(key);
    }

    console.log(`🌐 Searching Company: ${companyName}`);

    try {

        const { data } = await httpClient.get("/search", {
            params: {
                q: companyName,
                token: process.env.FINNHUB_API_KEY
            }
        });

        if (!data.result || data.result.length === 0) {
            throw new Error("Company not found");
        }

        // Prefer US and Indian stocks
        const stock =
            data.result.find(item =>
                item.type === "Common Stock" &&
                (
                    item.symbol.endsWith(".NS") ||
                    item.symbol.endsWith(".BO") ||
                    !item.symbol.includes(".")
                )
            ) || data.result[0];

        const result = {
            symbol: stock.symbol,
            description: stock.description
        };

        // Save in cache
        searchCache.set(key, result);

        return result;

    } catch (error) {

        console.error("❌ Search Tool Error:", error.message);

        throw error;

    }

};

module.exports = {
    searchCompany
};