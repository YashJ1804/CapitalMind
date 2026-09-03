import { formatCurrency } from "../../../utils/currency";

function PortfolioSummary({
    summary,
    holdings,
    currency = "USD",
    usdToInr = 88
}) {

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-3xl font-black text-white">
                        💼 Portfolio Overview
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Live overview of your investment portfolio.
                    </p>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">

                    <p className="text-sm text-slate-500">
                        Portfolio Status
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-green-400">
                        Active
                    </h3>

                </div>

            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Holdings */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="text-sm text-slate-500">
                        Holdings
                    </p>

                    <h3 className="mt-3 text-3xl font-black text-white">
                        {holdings.length}
                    </h3>

                </div>

                {/* Total Investment */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="text-sm text-slate-500">
                        Total Investment
                    </p>

                    <h3 className="mt-3 text-3xl font-black text-blue-400">

                        {formatCurrency(
                            summary?.totalInvestment || 0,
                            currency,
                            usdToInr
                        )}

                    </h3>

                </div>

                {/* Current Value */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="text-sm text-slate-500">
                        Current Value
                    </p>

                    <h3 className="mt-3 text-3xl font-black text-green-400">

                        {formatCurrency(
                            summary?.currentValue || 0,
                            currency,
                            usdToInr
                        )}

                    </h3>

                </div>

                {/* Return */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="text-sm text-slate-500">
                        Return
                    </p>

                    <h3
                        className={`mt-3 text-3xl font-black ${
                            (summary?.totalProfitLoss || 0) >= 0
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {(summary?.totalReturnPercentage || 0).toFixed(2)}%
                    </h3>

                </div>

            </div>

        </div>

    );
}

export default PortfolioSummary;