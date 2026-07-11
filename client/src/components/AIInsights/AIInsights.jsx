function AIInsights({ analysis }) {

    const insights = [

        {
            title: "Risk Level",
            value: analysis.riskLevel,
            icon: "⚠️"
        },

        {
            title: "Investment Horizon",
            value: analysis.investmentHorizon,
            icon: "📅"
        },

        {
            title: "Investor Type",
            value: analysis.investorType,
            icon: "👤"
        },

        {
            title: "Sector Outlook",
            value: analysis.sectorOutlook,
            icon: "🏭"
        },

        {
            title: "Volatility",
            value: analysis.volatility,
            icon: "📊"
        }

    ];

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-slate-700 transition-all duration-300">

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">

                🤖 AI Insights

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6">

                {insights.map((item, index) => (

                    <div

                        key={index}

                        className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500 hover:scale-105 transition-all duration-300"

                    >

                        <div className="text-3xl mb-3">

                            {item.icon}

                        </div>

                        <p className="text-slate-400 text-sm uppercase tracking-wide">

                            {item.title}

                        </p>

                        <h3 className="text-lg sm:text-xl font-semibold mt-3 break-words">

                            {item.value || "N/A"}

                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AIInsights;