import { useEffect, useState } from "react";

import api from "../services/api";

import AppLayout from "../layouts/AppLayout";

import EmptyHistory from "../components/history/EmptyHistory/EmptyHistory";
import HistoryList from "../components/history/HistoryList/HistoryList";
import HistorySkeleton from "../components/history/HistorySkeleton/HistorySkeleton";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const response = await api.get("/history");

                setHistory(response.data.data);

            } catch (error) {

                console.error("Failed to fetch history:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchHistory();

    }, []);

    return (

        <AppLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-black text-white">

                        📜 Analysis History

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Review all of your previous AI investment analyses.

                    </p>

                </div>

                {loading ? (

                    <HistorySkeleton />

                ) : history.length === 0 ? (

                    <EmptyHistory />

                ) : (

                    <HistoryList history={history} />

                )}

            </div>

        </AppLayout>

    );

}

export default History;