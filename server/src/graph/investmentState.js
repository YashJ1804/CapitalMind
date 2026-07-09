const { Annotation } = require("@langchain/langgraph");

const InvestmentState = Annotation.Root({

    company: Annotation(),

    symbol: Annotation(),

    profile: Annotation(),

    quote: Annotation(),

    news: Annotation(),

    decision: Annotation()

});

module.exports = InvestmentState;