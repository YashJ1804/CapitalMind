function EmptyWatchlist() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

            <div className="mb-4 text-6xl">
                ⭐
            </div>

            <h2 className="text-3xl font-bold text-white">
                Your Watchlist is Empty
            </h2>

            <p className="mt-3 text-slate-400">
                Analyze a company and click
                <span className="font-semibold text-yellow-400">
                    {" "}Add to Watchlist{" "}
                </span>
                to save it here.
            </p>

        </div>
    );
}

export default EmptyWatchlist;