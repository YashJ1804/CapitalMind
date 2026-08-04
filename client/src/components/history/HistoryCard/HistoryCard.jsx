function HistoryCard({ item }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg hover:border-blue-500 transition-all duration-300">

            <div className="flex flex-col lg:flex-row justify-between gap-6">

                <div className="flex-1">

                    <h2 className="text-2xl font-bold text-white">
                        {item.company}
                    </h2>

                    <p className="text-slate-400 mt-3 leading-7">
                        {item.summary}
                    </p>

                </div>

                <div className="text-left lg:text-right">

                    <h3 className="text-3xl font-black text-green-400">
                        {item.recommendation}
                    </h3>

                    <p className="mt-3 text-slate-300">
                        Score: <span className="font-semibold">{item.score}</span>
                    </p>

                    <p className="text-slate-300">
                        Confidence: <span className="font-semibold">{item.confidence}%</span>
                    </p>

                </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">

                <p className="text-sm text-slate-500">
                    {new Date(item.createdAt).toLocaleString()}
                </p>

            </div>

        </div>
    );
}

export default HistoryCard;