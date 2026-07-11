function NewsSection({ news }) {

    if (!news || news.length === 0) {

        return null;

    }

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-slate-700 transition-all duration-300">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">

                    📰 Latest News

                </h2>

                <span className="text-slate-400 text-sm">

                    Top {Math.min(news.length, 3)} Headlines

                </span>

            </div>

            <div className="space-y-5">

                {news.slice(0, 3).map((item, index) => (

                    <a

                        key={index}

                        href={item.url}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="block bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-blue-500 hover:bg-slate-800 transition-all duration-300"

                    >

                        <div className="flex items-start gap-4">

                            <div className="text-3xl flex-shrink-0">

                                📰

                            </div>

                            <div className="flex-1">

                                <h3 className="text-lg sm:text-xl font-semibold leading-relaxed">

                                    {item.headline}

                                </h3>

                                <p className="text-slate-400 mt-3 text-sm sm:text-base line-clamp-3">

                                    {item.summary || "No summary available."}

                                </p>

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-5 text-sm text-slate-500">

                                    <span className="font-medium">

                                        {item.source}

                                    </span>

                                    <span>

                                        {new Date(item.date * 1000).toLocaleDateString()}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </a>

                ))}

            </div>

        </div>

    );

}

export default NewsSection;