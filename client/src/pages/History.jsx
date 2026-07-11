import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import api from "../services/api";

function History() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const response = await api.get("/history");

                setHistory(response.data.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchHistory();

    }, []);

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

                <h1 className="text-4xl font-bold mb-10">

                    📜 Analysis History

                </h1>

                {loading && (

                    <p>Loading...</p>

                )}

                {!loading && history.length === 0 && (

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

    <div className="text-6xl mb-4">

        📜

    </div>

    <h2 className="text-3xl font-bold">

        No Analysis Yet

    </h2>

    <p className="text-slate-400 mt-3">

        Start analyzing companies to build your investment history.

    </p>

</div>

                )}

                <div className="grid gap-6">

                    {history.map((item) => (

                        <div

                            key={item._id}

                            className="bg-slate-900 border border-slate-800 rounded-xl p-6"

                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        {item.company}

                                    </h2>

                                    <p className="text-slate-400 mt-2">

                                        {item.summary}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <h3 className="text-3xl font-bold text-green-400">

                                        {item.recommendation}

                                    </h3>

                                    <p>

                                        Score : {item.score}
                                    </p>

                                    <p>

                                        Confidence : {item.confidence}%

                                    </p>

                                </div>

                            </div>

                            <p className="text-slate-500 mt-5">

                                {new Date(item.createdAt).toLocaleString()}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </>

    );

}

export default History;