import { useState } from "react";
import api from "./services/api";

function App() {

    const [company, setCompany] = useState("");
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {

        if (!company.trim()) return;

        try {

            const response = await api.post("/analyze", {
                company
            });

            setResult(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white p-10 rounded-xl shadow-lg w-[500px]">

                <h1 className="text-3xl font-bold mb-6 text-center">

                    AI Investment Research Agent

                </h1>

                <input

                    type="text"

                    placeholder="Enter Company Name"

                    className="w-full border p-3 rounded"

                    value={company}

                    onChange={(e) => setCompany(e.target.value)}

                />

                <button

                    onClick={handleAnalyze}

                    className="w-full bg-blue-600 text-white mt-4 py-3 rounded"

                >

                    Analyze

                </button>

                {result && (

<div className="mt-6 rounded-lg border bg-white p-4">

<h2 className="text-2xl font-bold">

{result.data.company}

</h2>

<p className="mt-2">

<b>Recommendation:</b> {result.data.recommendation}

</p>

<p>

<b>Investment Score:</b> {result.data.score}

</p>

<p>

<b>Confidence:</b> {result.data.confidence}%

</p>

<p className="mt-3">

{result.data.summary}

</p>

</div>

)}

            </div>

        </div>

    );

}

export default App;