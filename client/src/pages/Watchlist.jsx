import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";

import api from "../services/api";

function Watchlist() {

    const [stocks, setStocks] = useState([]);

    const loadWatchlist = async () => {

        try {

            const response = await api.get("/watchlist");

            setStocks(response.data.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadWatchlist();

    }, []);

    const removeStock = async (id) => {

        try {

            await api.delete(`/watchlist/${id}`);

            loadWatchlist();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

                <h1 className="text-4xl font-bold mb-10">

                    ⭐ Watchlist

                </h1>

                {

                    stocks.length === 0 && (

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

    <div className="text-6xl mb-4">

        ⭐

    </div>

    <h2 className="text-3xl font-bold">

        Your Watchlist is Empty

    </h2>

    <p className="text-slate-400 mt-3">

        Analyze a company and click

        "Add to Watchlist"

        to save it here.

    </p>

</div>

                    )

                }

                <div className="grid gap-6">

                    {

                        stocks.map((stock) => (

                            <div

                                key={stock._id}

                                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center"

                            >

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        {stock.company}

                                    </h2>

                                    <p className="text-slate-400">

                                        {stock.symbol}

                                    </p>

                                </div>

                                <button

                                    onClick={() => removeStock(stock._id)}

                                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"

                                >

                                    Remove

                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default Watchlist;