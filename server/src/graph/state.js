const { Annotation } = require("@langchain/langgraph");

const GraphState = Annotation.Root({

    company: Annotation(),

    symbol: Annotation(),

    profile: Annotation(),

    quote: Annotation(),

    chart: Annotation(),

    news: Annotation(),

    risk: Annotation(),

    analysis: Annotation()


});

module.exports = {

    GraphState

};