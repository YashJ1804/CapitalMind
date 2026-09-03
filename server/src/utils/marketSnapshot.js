const calculateMarketSnapshot = (indices) => {

    const validIndices = Object.values(indices)
        .filter(Boolean)
        .filter(
            (index) =>
                typeof index.changePercent === "number"
        );


    if (validIndices.length === 0) {

        return {

            direction: "UNKNOWN",

            advancing: 0,

            declining: 0,

            unchanged: 0,

            bestPerformer: null,

            worstPerformer: null

        };

    }


    const advancing =
        validIndices.filter(
            (index) =>
                index.changePercent > 0
        );


    const declining =
        validIndices.filter(
            (index) =>
                index.changePercent < 0
        );


    const unchanged =
        validIndices.filter(
            (index) =>
                index.changePercent === 0
        );


    const sorted = [...validIndices].sort(
        (a, b) =>
            b.changePercent -
            a.changePercent
    );


    const bestPerformer =
        sorted[0];


    const worstPerformer =
        sorted[sorted.length - 1];


    let direction = "MIXED";


    if (
        advancing.length >
        declining.length
    ) {

        direction = "BULLISH";

    } else if (
        declining.length >
        advancing.length
    ) {

        direction = "BEARISH";

    }


    return {

        direction,

        advancing: advancing.length,

        declining: declining.length,

        unchanged: unchanged.length,

        totalIndices: validIndices.length,

        bestPerformer: {

            name: bestPerformer.name,

            symbol: bestPerformer.symbol,

            changePercent:
                bestPerformer.changePercent

        },

        worstPerformer: {

            name: worstPerformer.name,

            symbol: worstPerformer.symbol,

            changePercent:
                worstPerformer.changePercent

        }

    };

};


module.exports = {
    calculateMarketSnapshot
};