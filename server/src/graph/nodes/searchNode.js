const market = require("../../providers/marketProvider");

const searchNode = async (state) => {

    console.log("🔍 LangGraph: Search Node");
    console.log("🔍 Search Node");

    const stock = await market.search(state.company);

    return {

        company: state.company,

        symbol: stock.symbol

    };

};

module.exports = {

    searchNode

};