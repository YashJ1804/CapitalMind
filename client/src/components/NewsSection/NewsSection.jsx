function NewsSection({ news }) {

    if (!news || news.length === 0) {

        return null;

    }

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-xl p-6 lg:p-8">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <div>

                    <h2 className="text-3xl font-black">

                        📰 Latest News

                    </h2>

                    <p className="text-slate-500 mt-2">

                        Recent headlines impacting this company

                    </p>

                </div>

                <div className="px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-sm">

                    {Math.min(news.length, 3)} Articles

                </div>

            </div>

            {/* News */}

            <div className="space-y-5">

                {

                    news.slice(0, 3).map((item, index) => (

                        <a

                            key={index}

                            href={item.url}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                            block
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-950
                            p-6
                            hover:border-blue-500
                            hover:-translate-y-1
                            hover:shadow-xl
                            transition-all
                            duration-300
                            "

                        >

                            <div className="flex gap-5">

                                {/* Icon */}

                                <div
                                    className="
                                    w-14
                                    h-14
                                    rounded-xl
                                    bg-blue-500/10
                                    border
                                    border-blue-500/20
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                    text-2xl
                                    "
                                >

                                    📰

                                </div>

                                {/* Content */}

                                <div className="flex-1">

                                    <h3 className="text-xl font-bold leading-relaxed text-white">

                                        {item.headline}

                                    </h3>

                                    <p className="text-slate-400 mt-4 leading-7 line-clamp-3">

                                        {

                                            item.summary ||

                                            "No summary available."

                                        }

                                    </p>

                                    <div className="flex flex-wrap justify-between items-center gap-4 mt-6">

                                        <span
                                            className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-slate-800
                                            text-slate-300
                                            text-sm
                                            "
                                        >

                                            {item.source}

                                        </span>

                                        <span className="text-slate-500 text-sm">

                                            {

                                                new Date(

                                                    item.date * 1000

                                                ).toLocaleDateString()

                                            }

                                        </span>

                                    </div>

                                </div>

                            </div>

                        </a>

                    ))

                }

            </div>

        </div>

    );

}

export default NewsSection;