function ProsCons({ pros, cons }) {

    return (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Pros */}

            <div className="bg-slate-900 border border-green-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-green-500 transition-all duration-300">

                <div className="flex items-center gap-3 mb-6">

                    <div className="text-4xl">

                        ✅

                    </div>

                    <div>

                        <h2 className="text-xl sm:text-2xl font-bold text-green-400">

                            Strengths

                        </h2>

                        <p className="text-slate-400 text-sm">

                            Positive investment indicators

                        </p>

                    </div>

                </div>

                <ul className="space-y-4">

                    {(pros || []).map((item, index) => (

                        <li

                            key={index}

                            className="flex items-start gap-3 text-slate-300 leading-7"

                        >

                            <span className="text-green-400 mt-1">

                                ✔

                            </span>

                            <span>

                                {item}

                            </span>

                        </li>

                    ))}

                    {(!pros || pros.length === 0) && (

                        <li className="text-slate-500">

                            No major strengths identified.

                        </li>

                    )}

                </ul>

            </div>

            {/* Cons */}

            <div className="bg-slate-900 border border-red-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-red-500 transition-all duration-300">

                <div className="flex items-center gap-3 mb-6">

                    <div className="text-4xl">

                        ❌

                    </div>

                    <div>

                        <h2 className="text-xl sm:text-2xl font-bold text-red-400">

                            Weaknesses

                        </h2>

                        <p className="text-slate-400 text-sm">

                            Potential investment concerns

                        </p>

                    </div>

                </div>

                <ul className="space-y-4">

                    {(cons || []).map((item, index) => (

                        <li

                            key={index}

                            className="flex items-start gap-3 text-slate-300 leading-7"

                        >

                            <span className="text-red-400 mt-1">

                                ✖

                            </span>

                            <span>

                                {item}

                            </span>

                        </li>

                    ))}

                    {(!cons || cons.length === 0) && (

                        <li className="text-slate-500">

                            No significant weaknesses identified.

                        </li>

                    )}

                </ul>

            </div>

        </div>

    );

}

export default ProsCons;