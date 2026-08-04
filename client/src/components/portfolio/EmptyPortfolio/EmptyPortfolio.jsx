function EmptyPortfolio() {
    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 shadow-xl">

            <div className="flex flex-col items-center text-center">

                <div className="text-7xl">
                    💼
                </div>

                <h2 className="mt-6 text-3xl font-black text-white">
                    Your Portfolio is Empty
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

                    You haven't added any investments yet.

                    Once portfolio management is available,
                    your holdings, returns and allocation will
                    automatically appear here.

                </p>

                <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 px-8 py-5">

                    <p className="text-sm uppercase tracking-widest text-slate-500">
                        Current Portfolio Value
                    </p>

                    <h3 className="mt-2 text-4xl font-black text-green-400">
                        $0.00
                    </h3>

                </div>

            </div>

        </div>

    );

}

export default EmptyPortfolio;