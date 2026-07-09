const { getQuote } = require("../../tools/financialTool");

const financialNode = async (state) => {

    const quote = await getQuote(state.symbol);

    return {
        
        quote

    };

};

module.exports = financialNode;