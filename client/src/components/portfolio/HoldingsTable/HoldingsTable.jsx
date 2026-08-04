function HoldingsTable({ holdings }) {

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="mb-8">

                <h2 className="text-3xl font-black text-white">
                    📋 Holdings
                </h2>

                <p className="mt-2 text-slate-400">
                    Live holdings fetched from your portfolio.
                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-slate-800 text-left">

                            <th className="pb-4 text-slate-400">Symbol</th>
                            <th className="pb-4 text-slate-400">Quantity</th>
                            <th className="pb-4 text-slate-400">Avg Price</th>
                            <th className="pb-4 text-slate-400">Current</th>
                            <th className="pb-4 text-slate-400">Value</th>
                            <th className="pb-4 text-slate-400">P/L</th>
                            <th className="pb-4 text-slate-400">Return</th>

                        </tr>

                    </thead>

                    <tbody>

                        {holdings.map((holding) => (

                            <tr
                                key={holding._id}
                                className="border-b border-slate-800 hover:bg-slate-950 transition-all"
                            >

                                <td className="py-5">

    <div>

        <h3 className="font-bold text-white">

            {holding.companyName}

        </h3>

        <p className="mt-1 text-sm text-slate-400">

            {holding.symbol}

        </p>

    </div>

</td>

                                <td className="py-5">
                                    {holding.quantity}
                                </td>

                                <td className="py-5">
                                    ${holding.averagePrice.toFixed(2)}
                                </td>

                                <td className="py-5">
                                    ${holding.currentPrice.toFixed(2)}
                                </td>

                                <td className="py-5 text-blue-400 font-semibold">
                                    ${holding.currentValue.toFixed(2)}
                                </td>

                                <td
                                    className={`py-5 font-semibold ${
                                        holding.profitLoss >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    ${holding.profitLoss.toFixed(2)}
                                </td>

                                <td
                                    className={`py-5 font-semibold ${
                                        holding.returnPercentage >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {holding.returnPercentage.toFixed(2)}%
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default HoldingsTable;