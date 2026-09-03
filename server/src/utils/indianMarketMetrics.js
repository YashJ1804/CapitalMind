// ============================================================
// Indian Market Metrics
// ============================================================

const calculateIndianMarketMetrics = (history = []) => {

    if (!Array.isArray(history) || history.length === 0) {

        return {

            dataPoints: 0,

            periodReturn: null,

            volatility: null,

            high: null,

            low: null,

            drawdown: null,

            trend: "INSUFFICIENT_DATA"

        };

    }


    // --------------------------------------------------------
    // Extract valid closing prices
    // --------------------------------------------------------

    const closes = history

        .map(item => Number(item.close))

        .filter(
            price =>
                Number.isFinite(price) &&
                price > 0
        );


    if (closes.length < 2) {

        return {

            dataPoints: closes.length,

            periodReturn: null,

            volatility: null,

            high: closes[0] ?? null,

            low: closes[0] ?? null,

            drawdown: null,

            trend: "INSUFFICIENT_DATA"

        };

    }


    // --------------------------------------------------------
    // Period return
    // --------------------------------------------------------

    const firstPrice =
        closes[0];

    const lastPrice =
        closes[closes.length - 1];


    const periodReturn =
        ((lastPrice - firstPrice) /
            firstPrice) * 100;


    // --------------------------------------------------------
    // High / Low
    // --------------------------------------------------------

    const high =
        Math.max(...closes);

    const low =
        Math.min(...closes);


    // --------------------------------------------------------
    // Daily returns
    // --------------------------------------------------------

    const dailyReturns = [];


    for (
        let i = 1;
        i < closes.length;
        i++
    ) {

        const previous =
            closes[i - 1];

        const current =
            closes[i];


        if (
            previous > 0 &&
            current > 0
        ) {

            dailyReturns.push(
                ((current - previous) /
                    previous) * 100
            );

        }

    }


    // --------------------------------------------------------
    // Volatility
    // --------------------------------------------------------

    let volatility = null;


    if (dailyReturns.length > 1) {

        const mean =
            dailyReturns.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) /
            dailyReturns.length;


        const variance =
            dailyReturns.reduce(
                (sum, value) =>
                    sum +
                    Math.pow(
                        value - mean,
                        2
                    ),
                0
            ) /
            (dailyReturns.length - 1);


        const dailyVolatility =
            Math.sqrt(variance);


        // Approximate annualized volatility
        volatility =
            dailyVolatility *
            Math.sqrt(252);

    }


    // --------------------------------------------------------
    // Maximum drawdown
    // --------------------------------------------------------

    let peak =
        closes[0];

    let maximumDrawdown =
        0;


    for (const price of closes) {

        if (price > peak) {

            peak = price;

        }


        const drawdown =
            ((price - peak) /
                peak) * 100;


        if (
            drawdown <
            maximumDrawdown
        ) {

            maximumDrawdown =
                drawdown;

        }

    }


    // --------------------------------------------------------
    // Simple trend determination
    // --------------------------------------------------------

    const midpoint =
        Math.floor(
            closes.length / 2
        );


    const firstHalf =
        closes.slice(
            0,
            midpoint
        );


    const secondHalf =
        closes.slice(
            midpoint
        );


    const average =
        values =>
            values.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) /
            values.length;


    const firstAverage =
        average(firstHalf);

    const secondAverage =
        average(secondHalf);


    let trend =
        "SIDEWAYS";


    const trendChange =
        ((secondAverage -
            firstAverage) /
            firstAverage) * 100;


    if (trendChange > 2) {

        trend =
            "UPTREND";

    } else if (trendChange < -2) {

        trend =
            "DOWNTREND";

    }


    return {

        dataPoints:
            closes.length,

        periodReturn:
            Number(
                periodReturn.toFixed(2)
            ),

        volatility:
            volatility === null
                ? null
                : Number(
                    volatility.toFixed(2)
                ),

        high:
            Number(
                high.toFixed(2)
            ),

        low:
            Number(
                low.toFixed(2)
            ),

        drawdown:
            Number(
                maximumDrawdown.toFixed(2)
            ),

        trend,

        firstPrice:
            Number(
                firstPrice.toFixed(2)
            ),

        lastPrice:
            Number(
                lastPrice.toFixed(2)
            )

    };

};


module.exports = {

    calculateIndianMarketMetrics

};