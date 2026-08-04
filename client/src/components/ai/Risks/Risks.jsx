function Risks({ risks }) {

    return (

        <div className="bg-slate-900 border border-yellow-600 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-yellow-500 transition-all duration-300">

            <div className="flex items-center gap-3 mb-6">

                <div className="text-4xl">

                    ⚠️

                </div>

                <div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">

                        Investment Risks

                    </h2>

                    <p className="text-slate-400 text-sm">

                        Potential factors that could affect future performance

                    </p>

                </div>

            </div>

            <ul className="space-y-4">

                {(risks || []).map((risk, index) => (

                    <li

                        key={index}

                        className="flex items-start gap-3 text-slate-300 leading-7"

                    >

                        <span className="text-yellow-400 mt-1">

                            ⚠

                        </span>

                        <span>

                            {risk}

                        </span>

                    </li>

                ))}

                {(!risks || risks.length === 0) && (

                    <li className="text-slate-500">

                        No significant investment risks identified.

                    </li>

                )}

            </ul>

        </div>

    );

}

export default Risks;