const axios = require("axios");

const getUsdToInrRate = async () => {

    try {

        const response = await axios.get(
            "https://api.frankfurter.dev/v2/rate/USD/INR",
            {
                timeout: 10000
            }
        );

        if (!response.data?.rate) {
            throw new Error("Invalid USD/INR exchange rate.");
        }

        return {
            rate: response.data.rate,
            date: response.data.date,
            base: response.data.base,
            quote: response.data.quote
        };

    } catch (error) {

        console.error(
            "Failed to fetch USD/INR rate:",
            error.message
        );

        throw new Error(
            "Unable to fetch current USD/INR exchange rate."
        );

    }

};

module.exports = {
    getUsdToInrRate
};