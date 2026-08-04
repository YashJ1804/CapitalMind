function MarketSnapshot({ market, setCompany }) {

    return (

        <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-slate-900 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-5">

                    📈 Market Snapshot

                </h2>

                <div className="space-y-4">

                    {

                        market.indices.map((item)=>(

                            <div

                            key={item.name}

                            className="flex justify-between border-b border-slate-800 pb-2">

                                <span>{item.name}</span>

                               <span
    className={
        item.change >= 0
            ? "text-green-400"
            : "text-red-400"
    }
>
    {item.change >= 0 ? "+" : ""}
    {item.change.toFixed(2)}%
</span>

                            </div>

                        ))

                    }

                </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-5">

                    🔥 Trending Stocks

                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

    {

        market.trending.map((stock) => (

            <button

                key={stock.symbol}

                onClick={() => setCompany(stock.symbol)}

                className="bg-slate-800 hover:bg-blue-600 transition rounded-xl p-4 text-left"

            >

                <h3 className="font-bold text-lg">

                    {stock.symbol}

                </h3>

                <p className="text-slate-300 mt-1">
    {stock.company}
</p>

<p className="text-green-400 font-semibold mt-2">
    $
    {stock.price
        ? stock.price.toFixed(2)
        : "--"}
</p>

<p
    className={
        stock.change >= 0
            ? "text-green-400"
            : "text-red-400"
    }
>
    {stock.change >= 0 ? "+" : ""}
    {stock.change
        ? stock.change.toFixed(2)
        : "0.00"}
    %
</p>

                <p
                    className={
                        stock.change >= 0
                            ? "text-green-400"
                            : "text-red-400"
                    }
                >

                    {stock.change.toFixed(2)}%

                </p>

            </button>

        ))

    }

</div>

            </div>

        </div>

    );

}

export default MarketSnapshot;