const market = require("../../providers/marketProvider");

const financialNode = async (state) => {

    console.log("💰 Financial Node", new Date().toLocaleTimeString());

    let quote = null;
    let chart = null;

    try {

        [quote, chart] = await Promise.all([

            market.getQuote(state.symbol),

            market.getChart(state.symbol)

        ]);

    } catch (error) {

        console.log("⚠ Financial data partially unavailable.");

        try {

            quote = await market.getQuote(state.symbol);

        } catch (err) {

            console.log("⚠ Quote unavailable.");

        }

        try {

            chart = await market.getChart(state.symbol);

        } catch (err) {

            console.log("⚠ Chart unavailable.");

        }

    }

    return {

        quote,

        chart

    };

};

module.exports = {

    financialNode

};