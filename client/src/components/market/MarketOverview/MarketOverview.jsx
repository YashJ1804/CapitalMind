function MarketOverview({ profile, quote }) {

    const formattedMarketCap =
        profile.marketCap >= 1000
            ? `${(profile.marketCap / 1000).toFixed(2)} T`
            : `${profile.marketCap.toFixed(2)} B`;

    const metrics = [
        {
            title: "Ticker",
            value: profile.ticker,
            icon: "🏷️"
        },
        {
            title: "Industry",
            value: profile.industry,
            icon: "🏭"
        },
        {
            title: "Exchange",
            value: profile.exchange,
            icon: "🏛️"
        },
        {
            title: "Country",
            value: profile.country,
            icon: "🌍"
        },
        {
            title: "Market Cap",
            value: `$${formattedMarketCap}`,
            icon: "💰"
        },
        {
            title: "Current Price",
            value: `$${quote.currentPrice}`,
            icon: "📈",
            color: "text-green-400 text-3xl font-black"
        },
        {
            title: "Day High",
            value: `$${quote.high}`,
            icon: "⬆️"
        },
        {
            title: "Day Low",
            value: `$${quote.low}`,
            icon: "⬇️"
        },
        {
            title: "Daily Change",
            value: `${quote.percentChange}%`,
            icon: quote.change >= 0 ? "🟢" : "🔴",
            color:
                quote.change >= 0
                    ? "text-green-400 text-2xl font-bold"
                    : "text-red-400 text-2xl font-bold"
        }
    ];

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-xl p-6 lg:p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-3xl font-black">

                        📈 Market Overview

                    </h2>

                    <p className="text-slate-500 mt-2">

                        Live company fundamentals and market statistics

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {

                    metrics.map((item) => (

                        <div

                            key={item.title}

                            className="
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-950
                            p-5
                            hover:border-blue-500
                            hover:-translate-y-1
                            transition-all
                            duration-300
                            "

                        >

                            <div className="flex justify-between items-center">

                                <p className="text-slate-500 uppercase text-xs tracking-widest">

                                    {item.title}

                                </p>

                                <span className="text-xl">

                                    {item.icon}

                                </span>

                            </div>

                            <h3
                                className={`

                                mt-5

                                break-words

                                text-2xl

                                font-bold

                                ${item.color || "text-white"}

                                `}

                            >

                                {item.value}

                            </h3>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default MarketOverview;