import { useEffect, useState } from "react";

import api from "../services/api";

import AppLayout from "../layouts/AppLayout";

import EmptyWatchlist from "../components/watchlist/EmptyWatchlist/EmptyWatchlist";
import WatchlistGrid from "../components/watchlist/WatchlistGrid/WatchlistGrid";
import WatchlistSkeleton from "../components/watchlist/WatchlistSkeleton/WatchlistSkeleton";

function Watchlist() {

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWatchlist = async () => {
    try {
       const response = await api.get("/watchlist/summary");

setStocks(response.data.data.stocks);
    } catch (error) {
        console.error("Failed to load watchlist:", error);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {

    loadWatchlist();

    const interval = setInterval(() => {

        loadWatchlist();

    }, 30000);

    return () => clearInterval(interval);

}, []);
    const removeStock = async (id) => {

        try {

            await api.delete(`/watchlist/${id}`);

            setStocks((prev) => prev.filter((stock) => stock._id !== id));

        } catch (error) {

            console.error("Failed to remove stock:", error);

        }

    };

    return (

        <AppLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-black text-white">

                        ⭐ Watchlist

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Track companies you're interested in and monitor them for future analysis.

                    </p>

                </div>

                {loading ? (

                    <WatchlistSkeleton />

                ) : stocks.length === 0 ? (

                    <EmptyWatchlist />

                ) : (

                    <WatchlistGrid
                        stocks={stocks}
                        removeStock={removeStock}
                    />

                )}

            </div>

        </AppLayout>

    );

}

export default Watchlist;