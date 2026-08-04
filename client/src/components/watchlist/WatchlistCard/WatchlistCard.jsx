function WatchlistCard({ stock, removeStock }) {

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:border-yellow-500">

            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        {stock.company}
                    </h2>

                    <p className="mt-2 text-slate-400">
                        {stock.symbol}
                    </p>

                </div>

                <button
                    onClick={() => removeStock(stock._id)}
                    className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                >
                    Remove
                </button>

            </div>

        </div>

    );

}

export default WatchlistCard;