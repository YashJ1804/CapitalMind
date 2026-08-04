function HistorySkeleton() {

    return (

        <div className="grid gap-6">

            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 animate-pulse"
                >

                    <div className="h-8 w-48 rounded bg-slate-800"></div>

                    <div className="mt-4 h-4 w-full rounded bg-slate-800"></div>

                    <div className="mt-2 h-4 w-5/6 rounded bg-slate-800"></div>

                    <div className="mt-8 flex justify-between">

                        <div className="h-5 w-28 rounded bg-slate-800"></div>

                        <div className="h-5 w-20 rounded bg-slate-800"></div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default HistorySkeleton;