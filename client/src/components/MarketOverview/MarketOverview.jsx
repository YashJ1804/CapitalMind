function MarketOverview({ profile, quote }) {

    const formattedMarketCap =
        profile.marketCap >= 1000
            ? `${(profile.marketCap / 1000).toFixed(2)} T`
            : `${profile.marketCap.toFixed(2)} B`;

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-slate-700 transition-all duration-300">

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">

                📈 Market Overview

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                {/* Ticker */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Ticker

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2 break-words">

                        {profile.ticker}

                    </h3>

                </div>

                {/* Industry */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Industry

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2 break-words">

                        {profile.industry}

                    </h3>

                </div>

                {/* Exchange */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Exchange

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2 break-words">

                        {profile.exchange}

                    </h3>

                </div>

                {/* Country */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Country

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2">

                        {profile.country}

                    </h3>

                </div>

                {/* Market Cap */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Market Cap

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2">

                        ${formattedMarketCap}

                    </h3>

                </div>

                {/* Current Price */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Current Price

                    </p>

                    <h3 className="text-green-400 text-2xl sm:text-3xl font-bold mt-2">

                        ${quote.currentPrice}

                    </h3>

                </div>

                {/* High */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        High

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2">

                        ${quote.high}

                    </h3>

                </div>

                {/* Low */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Low

                    </p>

                    <h3 className="text-lg sm:text-xl font-semibold mt-2">

                        ${quote.low}

                    </h3>

                </div>

                {/* Daily Change */}

                <div className="bg-slate-800/50 rounded-xl p-4">

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Daily Change

                    </p>

                    <h3
                        className={`mt-2 text-2xl font-bold ${
                            quote.change >= 0
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >

                        {quote.percentChange}%

                    </h3>

                </div>

            </div>

        </div>

    );

}

export default MarketOverview;