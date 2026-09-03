const {
    getIndianIndices,
    getHistoricalData
} = require("../tools/indianMarketTool");

const {
    calculateMarketSnapshot
} = require("../utils/marketSnapshot");

// ============================================================
// Indian Market Overview
// ============================================================

const getIndianMarketOverview = async () => {

    const indices = await getIndianIndices();

    const snapshot =
        calculateMarketSnapshot(indices);

    return {

        market: "INDIA",

        indices: {

            nifty50: indices.nifty50,

            sensex: indices.sensex,

            bankNifty: indices.bankNifty

        },

        snapshot

    };

};


// ============================================================
// Historical Index Data
// ============================================================

const getIndianIndexHistory = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

    return await getHistoricalData(
        symbol,
        range,
        interval
    );

};


// ============================================================
// Indian Market Status
// ============================================================

const getIndianMarketStatus = () => {

    const now = new Date();

    // Convert current time to India Standard Time
    const indiaTime = new Intl.DateTimeFormat(
        "en-IN",
        {
            timeZone: "Asia/Kolkata",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    ).formatToParts(now);

    const parts = {};

    indiaTime.forEach((part) => {
        parts[part.type] = part.value;
    });

    const weekday = parts.weekday;

    const hour = Number(parts.hour);
    const minute = Number(parts.minute);

    const currentMinutes =
        hour * 60 + minute;

    const marketOpen =
        9 * 60 + 15;

    const marketClose =
        15 * 60 + 30;

    // Saturday / Sunday
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

        exchange: "NSE",

        timezone: "Asia/Kolkata",

        tradingHours: {
            open: "09:15",
            close: "15:30"
        }

    };

};


module.exports = {

    getIndianMarketOverview,

    getIndianIndexHistory,

    getIndianMarketStatus

};