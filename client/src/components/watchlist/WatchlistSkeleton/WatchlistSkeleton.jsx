function WatchlistSkeleton() {

    return (

        <div className="grid gap-6">

            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >

                    <div className="h-8 w-48 rounded bg-slate-800"></div>

                    <div className="mt-4 h-4 w-24 rounded bg-slate-800"></div>

                    <div className="mt-8 flex justify-end">

                        <div className="h-10 w-24 rounded bg-slate-800"></div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default WatchlistSkeleton;