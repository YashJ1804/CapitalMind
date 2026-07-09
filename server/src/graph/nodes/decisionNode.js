const { makeInvestmentDecision } = require("../../agents/decisionAgent");

const decisionNode = async (state) => {

    const decision = await makeInvestmentDecision(

        state.profile,

        state.quote,

        state.news

    );

    return {

        decision

    };

};

module.exports = decisionNode;