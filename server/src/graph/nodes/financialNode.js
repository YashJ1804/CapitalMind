const { getQuote } = require("../../tools/financialTool");
const { getChartData } = require("../../tools/chartTool");

const financialNode = async (state) => {

    console.log("💰 Financial Node");

    const [quote, chart] = await Promise.all([

        getQuote(state.symbol),

        getChartData(state.symbol)

    ]);

    return {

        ...state,

        quote,

        chart

    };

};

module.exports = {
    financialNode
};