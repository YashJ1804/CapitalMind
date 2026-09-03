import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "../../../utils/currency";

function HoldingsTable({
    holdings,
    currency = "USD",
    usdToInr = 88,
    removeHolding,
    editHolding
}) {

    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleDeleteClick = (holding) => {
        setDeleteTarget(holding);
    };

    const handleConfirmDelete = async () => {

        if (!deleteTarget) return;

        await removeHolding(deleteTarget._id);

        setDeleteTarget(null);
    };

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

                            <th className="pb-4 text-slate-400">
                                Symbol
                            </th>

                            <th className="pb-4 text-slate-400">
                                Quantity
                            </th>

                            <th className="pb-4 text-slate-400">
                                Avg Price
                            </th>

                            <th className="pb-4 text-slate-400">
                                Current
                            </th>

                            <th className="pb-4 text-slate-400">
                                Value
                            </th>

                            <th className="pb-4 text-slate-400">
                                P/L
                            </th>

                            <th className="pb-4 text-slate-400">
                                Return
                            </th>

                            <th className="pb-4 text-slate-400">
                                Actions
                            </th>

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
                                    {formatCurrency(
                                        holding.averagePrice,
                                        currency,
                                        usdToInr
                                    )}
                                </td>

                                <td className="py-5">
                                    {formatCurrency(
                                        holding.currentPrice,
                                        currency,
                                        usdToInr
                                    )}
                                </td>

                                <td className="py-5 text-blue-400 font-semibold">
                                    {formatCurrency(
                                        holding.currentValue,
                                        currency,
                                        usdToInr
                                    )}
                                </td>

                                <td
                                    className={`py-5 font-semibold ${
                                        holding.profitLoss >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {formatCurrency(
                                        holding.profitLoss,
                                        currency,
                                        usdToInr
                                    )}
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

                                <td className="py-5">

                                    <div className="flex items-center gap-2">

                                        <button
                                            onClick={() =>
                                                editHolding(holding)
                                            }
                                            className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300"
                                            title="Edit holding"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteClick(holding)
                                            }
                                            className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                                            title="Remove holding"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            {/* Delete Confirmation */}

            {deleteTarget && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

                    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                        <div className="text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">

                                <Trash2
                                    size={28}
                                    className="text-red-400"
                                />

                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-white">
                                Remove Investment?
                            </h2>

                            <p className="mt-3 text-slate-400">
                                Are you sure you want to remove{" "}
                                <span className="font-semibold text-white">
                                    {deleteTarget.companyName}
                                </span>{" "}
                                ({deleteTarget.symbol}) from your portfolio?
                            </p>

                        </div>


                        <div className="mt-8 flex gap-4">

                            <button
                                onClick={() =>
                                    setDeleteTarget(null)
                                }
                                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default HoldingsTable;