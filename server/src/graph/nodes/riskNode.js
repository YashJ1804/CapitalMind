const riskNode = async (state) => {

    console.log("⚠ Risk Analysis Node");

    const quote = state.quote;

    let riskLevel = "Medium";
    let riskScore = 60;

    if (quote) {

        if (Math.abs(quote.percentChange) > 5) {
            riskLevel = "High";
            riskScore = 85;
        } else if (Math.abs(quote.percentChange) < 2) {
            riskLevel = "Low";
            riskScore = 30;
        }

    }

    return {

        ...state,

        risk: {

            level: riskLevel,

            score: riskScore

        }

    };

};

module.exports = {

    riskNode

};