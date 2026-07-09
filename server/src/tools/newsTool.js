const httpClient = require("../services/httpClient");

const getCompanyNews = async (symbol) => {

    try {

        const today = new Date();

        const from = new Date();

        from.setDate(today.getDate() - 30);

        const format = (date) => date.toISOString().split("T")[0];

        const { data } = await httpClient.get("/company-news", {
            params: {
                symbol,
                from: format(from),
                to: format(today),
                token: process.env.FINNHUB_API_KEY
            }
        });

        if (!Array.isArray(data)) {
            return [];
        }

        return data
            .slice(0, 5)
            .map(item => ({
                headline: item.headline,
                summary: item.summary,
                source: item.source,
                url: item.url,
                date: item.datetime
            }));

    } catch (error) {

        console.error("❌ News Tool Error");

        console.error(error.message);

        return [];

    }

};

module.exports = {
    getCompanyNews
};