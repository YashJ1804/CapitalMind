function MarketOverview({ profile, quote, market }) {

    const isIndia = market === "INDIA";

    // ============================================================
    // Safe number formatter
    // ============================================================

    const formatNumber = (value, decimals = 2) => {

        const number = Number(value);

        if (!Number.isFinite(number)) {
            return "—";
        }

        return number.toFixed(decimals);

    };


    // ============================================================
    // Display ticker
    // ============================================================

    const displayTicker =
        profile?.ticker
            ?.replace(/\.NS$/i, "")
            .replace(/\.BO$/i, "") ||
        "—";


    // ============================================================
    // Market Cap
    // ============================================================

    const formatMarketCap = (value) => {

        const marketCap = Number(value);

        if (
            !Number.isFinite(marketCap) ||
            marketCap <= 0
        ) {
            return "—";
        }


        if (isIndia) {

            if (marketCap >= 1e12) {

                return `${(
                    marketCap / 1e12
                ).toFixed(2)} T`;

            }

            if (marketCap >= 1e9) {

                return `${(
                    marketCap / 1e9
                ).toFixed(2)} B`;

            }

            if (marketCap >= 1e7) {

                return `${(
                    marketCap / 1e7
                ).toFixed(2)} Cr`;

            }

            return marketCap.toLocaleString(
                "en-IN"
            );

        }


        // USA

        if (marketCap >= 1e12) {

            return `${(
                marketCap / 1e12
            ).toFixed(2)} T`;

        }

        if (marketCap >= 1e9) {

            return `${(
                marketCap / 1e9
            ).toFixed(2)} B`;

        }

        if (marketCap >= 1e6) {

            return `${(
                marketCap / 1e6
            ).toFixed(2)} M`;

        }

        return marketCap.toLocaleString(
            "en-US"
        );

    };


    // ============================================================
    // Currency
    // ============================================================

    const currency =
        isIndia ? "₹" : "$";


    // ============================================================
    // Quote values
    // ============================================================

    const currentPrice =
        Number(quote?.currentPrice);

    const dayHigh =
        Number(quote?.high);

    const dayLow =
        Number(quote?.low);

    const change =
        Number(quote?.change);

    const percentChange =
        Number(quote?.percentChange);


    const isPositive =
        Number.isFinite(change)
            ? change >= 0
            : Number(percentChange) >= 0;


    // ============================================================
    // Metrics
    // ============================================================

    const metrics = [

        {
            title: "Ticker",

            value:
                displayTicker,

            icon: "🏷️"

        },

        {
            title: "Industry",

            value:
                profile?.industry ||
                "—",

            icon: "🏭"

        },

        {
            title: "Exchange",

            value:
                profile?.exchange ||
                "—",

            icon: "🏛️"

        },

        {
            title: "Country",

            value:
                profile?.country ||
                "—",

            icon: "🌍"

        },

        {
            title: "Market Cap",

            value:
                profile?.marketCap
                    ? `${currency}${formatMarketCap(
                        profile.marketCap
                    )}`
                    : "—",

            icon: "💰"

        },

        {
            title: "Current Price",

            value:
                Number.isFinite(currentPrice)
                    ? `${currency}${formatNumber(
                        currentPrice
                    )}`
                    : "—",

            icon: "📈",

            color:
                "text-green-400 text-3xl font-black"

        },

        {
            title: "Day High",

            value:
                Number.isFinite(dayHigh)
                    ? `${currency}${formatNumber(
                        dayHigh
                    )}`
                    : "—",

            icon: "⬆️"

        },

        {
            title: "Day Low",

            value:
                Number.isFinite(dayLow)
                    ? `${currency}${formatNumber(
                        dayLow
                    )}`
                    : "—",

            icon: "⬇️"

        },

        {
            title: "Daily Change",

            value:
                Number.isFinite(percentChange)
                    ? `${
                        percentChange >= 0
                            ? "+"
                            : ""
                    }${formatNumber(
                        percentChange
                    )}%`
                    : "—",

            icon:
                isPositive
                    ? "🟢"
                    : "🔴",

            color:
                isPositive
                    ? "text-green-400 text-2xl font-bold"
                    : "text-red-400 text-2xl font-bold"

        }

    ];


    // ============================================================
    // Render
    // ============================================================

    return (

        <div className="
            w-full
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-6
            shadow-xl
            lg:p-8
        ">


            {/* ====================================================
                Header
            ===================================================== */}

            <div className="
                mb-8
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div>

                    <div className="flex items-center gap-3">

                        <h2 className="
                            text-2xl
                            font-black
                            text-white
                            sm:text-3xl
                        ">

                            📈 Market Overview

                        </h2>


                        <span className="
                            rounded-full
                            border
                            border-slate-700
                            bg-slate-950
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-slate-400
                        ">

                            {isIndia
                                ? "🇮🇳 India"
                                : "🇺🇸 USA"}

                        </span>

                    </div>


                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                    ">

                        Live company fundamentals and
                        market statistics

                    </p>

                </div>

            </div>


            {/* ====================================================
                Metrics
            ===================================================== */}

            <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
            ">

                {metrics.map((item) => (

                    <div
                        key={item.title}
                        className="
                            min-w-0
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-950
                            p-5
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-blue-500
                        "
                    >

                        {/* Card Header */}

                        <div className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        ">

                            <p className="
                                min-w-0
                                text-xs
                                font-semibold
                                uppercase
                                tracking-widest
                                text-slate-500
                            ">

                                {item.title}

                            </p>


                            <span className="
                                shrink-0
                                text-xl
                            ">

                                {item.icon}

                            </span>

                        </div>


                        {/* Card Value */}

                        <h3
                            className={`
                                mt-5
                                min-h-[2.5rem]
                                overflow-hidden
                                text-ellipsis
                                whitespace-nowrap
                                text-xl
                                font-bold
                                leading-tight
                                sm:text-2xl
                                ${item.color || "text-white"}
                            `}
                            title={item.value}
                        >

                            {item.value}

                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}


export default MarketOverview;