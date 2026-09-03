const {
    getUSMarketIndices,
    getUSHistoricalData
} = require("../tools/usMarketTool");

const {
    calculateMarketSnapshot
} = require("../utils/marketSnapshot");


// ============================================================
// US Market Overview
// ============================================================

const getUSMarketOverview = async () => {

    const indices =
        await getUSMarketIndices();

    const snapshot =
        calculateMarketSnapshot(indices);

    return {

        market: "USA",

        indices: {

            sp500: indices.sp500,

            nasdaq: indices.nasdaq,

            dowJones: indices.dowJones

        },

        snapshot

    };

};


// ============================================================
// Historical Index Data
// ============================================================

const getUSIndexHistory = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

    return await getUSHistoricalData(
        symbol,
        range,
        interval
    );

};


// ============================================================
// US Market Status
// ============================================================

const getUSMarketStatus = () => {

    const now = new Date();

    const usTime = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: "America/New_York",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    ).formatToParts(now);


    const parts = {};

    usTime.forEach((part) => {

        parts[part.type] = part.value;

    });


    const weekday = parts.weekday;

    const hour = Number(parts.hour);

    const minute = Number(parts.minute);


    const currentMinutes =
        hour * 60 + minute;


    const marketOpen =
        9 * 60 + 30;


    const marketClose =
        16 * 60;


    const isWeekend =
        weekday === "Sat" ||
        weekday === "Sun";


    const isOpen =
        !isWeekend &&
        currentMinutes >= marketOpen &&
        currentMinutes <= marketClose;


    return {

        isOpen,

        status: isOpen
            ? "OPEN"
            : "CLOSED",

        exchange: "NYSE / NASDAQ",

        timezone: "America/New_York",

        tradingHours: {

            open: "09:30",

            close: "16:00"

        }

    };

};


module.exports = {

    getUSMarketOverview,

    getUSIndexHistory,

    getUSMarketStatus

};