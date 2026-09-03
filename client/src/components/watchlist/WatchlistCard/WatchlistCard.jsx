import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    TrendingDown,
    TrendingUp,
    Trash2
} from "lucide-react";

function WatchlistCard({ stock, removeStock }) {

    const navigate = useNavigate();

    const currentPrice = Number(stock.currentPrice) || 0;
    const change = Number(stock.change) || 0;
    const percentChange = Number(stock.percentChange) || 0;

    const isPositive = percentChange >= 0;

    const handleAnalyze = () => {

        navigate(
            `/analyze?company=${encodeURIComponent(
                stock.symbol
            )}`
        );

    };

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:border-yellow-500/50">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Company */}

                <div className="flex-1">

                    <div className="flex items-center gap-3">

                        <h2 className="text-2xl font-bold text-white">
                            {stock.company || stock.companyName}
                        </h2>

                        <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300">
                            {stock.symbol}
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Added{" "}
                        {stock.addedAt
                            ? new Date(
                                stock.addedAt
                            ).toLocaleDateString()
                            : "Recently"}
                    </p>

                </div>


                {/* Market Data */}

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                    <div className="text-left sm:text-right">

                        <p className="text-xs uppercase tracking-widest text-slate-500">
                            Current Price
                        </p>

                        <p className="mt-1 text-2xl font-black text-white">
                            ${currentPrice.toFixed(2)}
                        </p>

                    </div>


                    <div
                        className={`flex items-center gap-2 ${
                            isPositive
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >

                        {isPositive ? (
                            <TrendingUp size={20} />
                        ) : (
                            <TrendingDown size={20} />
                        )}

                        <div>

                            <p className="font-bold">
                                {isPositive ? "+" : ""}
                                {change.toFixed(2)}
                            </p>

                            <p className="text-sm">
                                {isPositive ? "+" : ""}
                                {percentChange.toFixed(2)}%
                            </p>

                        </div>

                    </div>

                </div>


                {/* Actions */}

                <div className="flex items-center gap-3">

                    <button
                        onClick={handleAnalyze}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >

                        Analyze

                        <ArrowRight size={17} />

                    </button>


                    <button
                        onClick={() =>
                            removeStock(stock._id)
                        }
                        className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                        title="Remove from watchlist"
                    >

                        <Trash2 size={18} />

                        <span className="hidden sm:inline">
                            Remove
                        </span>

                    </button>

                </div>

            </div>

        </div>

    );

}

export default WatchlistCard;