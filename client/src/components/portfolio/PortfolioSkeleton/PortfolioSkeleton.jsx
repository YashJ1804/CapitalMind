function PortfolioSkeleton() {

    return (

        <div className="space-y-8 animate-pulse">

            {/* Stats */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {[1, 2, 3, 4].map((item) => (

                    <div
                        key={item}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >

                        <div className="h-4 w-24 rounded bg-slate-800"></div>

                        <div className="mt-6 h-10 w-28 rounded bg-slate-800"></div>

                        <div className="mt-5 h-4 w-32 rounded bg-slate-800"></div>

                    </div>

                ))}

            </div>

            {/* Summary */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="h-8 w-56 rounded bg-slate-800"></div>

                <div className="mt-6 h-5 w-80 rounded bg-slate-800"></div>

                <div className="mt-3 h-5 w-72 rounded bg-slate-800"></div>

            </div>

            {/* Holdings */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="h-8 w-40 rounded bg-slate-800"></div>

                <div className="mt-8 space-y-5">

                    {[1, 2, 3].map((row) => (

                        <div
                            key={row}
                            className="h-14 rounded-xl bg-slate-800"
                        />

                    ))}

                </div>

            </div>

        </div>

    );

}

export default PortfolioSkeleton;