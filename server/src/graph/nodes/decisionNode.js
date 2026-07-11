const { makeInvestmentDecision } = require("../../agents/decisionAgent");

const decisionNode = async (state) => {

    console.log("🤖 Decision Node");

    const analysis = await makeInvestmentDecision(

        state.profile,

        state.quote,

        state.news

    );

    return {

        ...state,

        analysis

    };

};

module.exports = {

    decisionNode

};