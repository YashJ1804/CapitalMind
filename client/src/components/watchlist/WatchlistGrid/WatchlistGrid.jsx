import WatchlistCard from "../WatchlistCard/WatchlistCard";

function WatchlistGrid({ stocks, removeStock }) {

    return (

        <div className="grid gap-6">

            {stocks.map((stock) => (

                <WatchlistCard
                    key={stock._id}
                    stock={stock}
                    removeStock={removeStock}
                />

            ))}

        </div>

    );

}

export default WatchlistGrid;