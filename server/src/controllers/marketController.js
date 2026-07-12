const marketProvider = require("../providers/marketProvider");

let cache = null;
let lastUpdated = 0;

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

const indices = [
    { name: "S&P 500", symbol: "SPY" },
    { name: "NASDAQ", symbol: "QQQ" },
    { name: "Dow Jones", symbol: "DIA" }
];

const trending = [
    { symbol: "AAPL", company: "Apple" },
    { symbol: "MSFT", company: "Microsoft" },
    { symbol: "NVDA", company: "NVIDIA" },
    { symbol: "TSLA", company: "Tesla" },
    { symbol: "AMZN", company: "Amazon" },
    { symbol: "GOOGL", company: "Google" }
];

const marketData = async (req, res) => {

    try {

        if (cache && (Date.now() - lastUpdated < CACHE_TIME)) {

            console.log("⚡ Returning Cached Market Data");

            return res.json({

                success: true,

                data: cache

            });

        }

        console.log("📈 Fetching Live Market Data");

        const indexData = await Promise.all(

            indices.map(async (item) => {

                const quote = await marketProvider.getQuote(item.symbol);

                return {

                    name: item.name,

                    value: quote.currentPrice,

                    change: quote.percentChange

                };

            })

        );

        const trendingData = await Promise.all(

            trending.map(async (item) => {

                const quote = await marketProvider.getQuote(item.symbol);

                return {

                    symbol: item.symbol,

                    company: item.company,

                    price: quote.currentPrice,

                    change: quote.percentChange

                };

            })

        );

        cache = {

            indices: indexData,

            trending: trendingData

        };

        lastUpdated = Date.now();

        return res.json({

            success: true,

            data: cache

        });

    }

    catch (error) {

        console.error("❌ Market Controller Error");

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch market data."

        });

    }

};

module.exports = {

    marketData

};