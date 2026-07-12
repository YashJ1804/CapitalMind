function AIInsights({ analysis }) {

    const insights = [

        {
            title: "Risk Level",
            value: analysis.riskLevel,
            icon: "⚠️",
            color: "text-red-400"
        },

        {
            title: "Investment Horizon",
            value: analysis.investmentHorizon,
            icon: "📅",
            color: "text-blue-400"
        },

        {
            title: "Investor Type",
            value: analysis.investorType,
            icon: "👤",
            color: "text-purple-400"
        },

        {
            title: "Sector Outlook",
            value: analysis.sectorOutlook,
            icon: "🏭",
            color: "text-yellow-400"
        },

        {
            title: "Volatility",
            value: analysis.volatility,
            icon: "📊",
            color: "text-green-400"
        }

    ];

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-xl p-6 lg:p-8">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-black">

                        🤖 AI Insights

                    </h2>

                    <p className="text-slate-500 mt-2">

                        Key insights generated from CapitalMind AI analysis

                    </p>

                </div>

                <div className="hidden md:flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2">

                    <span className="text-blue-400">

                        ●

                    </span>

                    <span className="text-sm text-blue-300">

                        AI Generated

                    </span>

                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

                {

                    insights.map((item, index) => (

                        <div

                            key={index}

                            className="
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-950
                            p-6
                            hover:border-blue-500
                            hover:-translate-y-1
                            hover:shadow-xl
                            transition-all
                            duration-300
                            "

                        >

                            <div className="flex justify-between items-center">

                                <div
                                    className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    bg-slate-800
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                    ${item.color}
                                    `}
                                >

                                    {item.icon}

                                </div>

                            </div>

                            <p className="mt-5 text-xs uppercase tracking-widest text-slate-500">

                                {item.title}

                            </p>

                            <h3 className="mt-3 text-xl font-bold text-white break-words">

                                {item.value || "N/A"}

                            </h3>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default AIInsights;