function News({ news }) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">

                📰 Latest News

            </h2>

            <div className="space-y-6">

                {(news || []).map((item, index) => (

                    <div
                        key={index}
                        className="border-b border-slate-800 pb-5 last:border-none"
                    >

                        <h3 className="text-xl font-semibold">

                            {item.headline}

                        </h3>

                        <p className="text-slate-400 mt-2">

                            {item.summary}

                        </p>

                        <div className="flex justify-between items-center mt-4">

                            <span className="text-sm text-slate-500">

                                {item.source}

                            </span>

                            <a

                                href={item.url}

                                target="_blank"

                                rel="noreferrer"

                                className="text-blue-400 hover:text-blue-300"

                            >

                                Read More →

                            </a>

                        </div>

                    </div>

                ))}

                {(!news || news.length === 0) && (

                    <p className="text-slate-500">

                        No recent news available.

                    </p>

                )}

            </div>

        </div>

    );

}

export default News;