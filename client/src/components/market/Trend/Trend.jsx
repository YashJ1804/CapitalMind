function MarketOverview({ snapshot }) {

    if (!snapshot) {
        return null;
    }

    const isBullish =
        snapshot.direction === "BULLISH";

    const isBearish =
        snapshot.direction === "BEARISH";

    const directionColor =
        isBullish
            ? "text-green-400"
            : isBearish
                ? "text-red-400"
                : "text-yellow-400";

    const directionIcon =
        isBullish
            ? "▲"
            : isBearish
                ? "▼"
                : "◆";


    const formatPercent = (value) => {

        return `${value >= 0 ? "+" : ""}${Number(
            value
        ).toFixed(2)}%`;

    };


    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-xl">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        MARKET INTELLIGENCE
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-white">
                        📊 Market Overview
                    </h2>

                </div>

                <div className="rounded-xl bg-slate-800 px-4 py-3 text-2xl">
                    📈
                </div>

            </div>


            {/* Direction */}

            <div className="mt-6 rounded-2xl bg-slate-950 p-5">

                <p className="text-sm text-slate-500">
                    Overall Market Direction
                </p>

                <p
                    className={`mt-2 text-3xl font-black ${directionColor}`}
                >

                    {directionIcon}{" "}
                    {snapshot.direction}

                </p>

            </div>


            {/* Market Breadth */}

            <div className="mt-5 grid grid-cols-3 gap-4">

                <div className="rounded-2xl bg-slate-950 p-4">

                    <p className="text-xs font-medium text-slate-500">
                        ADVANCING
                    </p>

                    <p className="mt-2 text-2xl font-bold text-green-400">
                        {snapshot.advancing}
                    </p>

                </div>


                <div className="rounded-2xl bg-slate-950 p-4">

                    <p className="text-xs font-medium text-slate-500">
                        DECLINING
                    </p>

                    <p className="mt-2 text-2xl font-bold text-red-400">
                        {snapshot.declining}
                    </p>

                </div>


                <div className="rounded-2xl bg-slate-950 p-4">

                    <p className="text-xs font-medium text-slate-500">
                        UNCHANGED
                    </p>

                    <p className="mt-2 text-2xl font-bold text-yellow-400">
                        {snapshot.unchanged}
                    </p>

                </div>

            </div>


            {/* Best / Worst */}

            <div className="mt-5 grid gap-4 md:grid-cols-2">

                {snapshot.bestPerformer && (

                    <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

                        <p className="text-xs font-medium text-slate-500">
                            BEST PERFORMER
                        </p>

                        <h3 className="mt-2 text-lg font-bold text-white">
                            {snapshot.bestPerformer.name}
                        </h3>

                        <p className="mt-2 text-xl font-bold text-green-400">

                            {formatPercent(
                                snapshot.bestPerformer.changePercent
                            )}

                        </p>

                    </div>

                )}


                {snapshot.worstPerformer && (

                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

                        <p className="text-xs font-medium text-slate-500">
                            WORST PERFORMER
                        </p>

                        <h3 className="mt-2 text-lg font-bold text-white">
                            {snapshot.worstPerformer.name}
                        </h3>

                        <p className="mt-2 text-xl font-bold text-red-400">

                            {formatPercent(
                                snapshot.worstPerformer.changePercent
                            )}

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default MarketOverview;