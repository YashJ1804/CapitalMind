import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

import { formatCurrency } from "../../../utils/currency";

const ALLOCATION_COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#84cc16"
];

export default function PortfolioCharts({
    holdings,
    currency = "USD",
    usdToInr = 88
}) {

    const allocationData = holdings.map((holding) => ({
        name: holding.symbol,
        value: holding.currentValue
    }));

    const comparisonData = holdings.map((holding) => ({
        name: holding.symbol,
        investment: holding.investment,
        currentValue: holding.currentValue
    }));

    const tooltipFormatter = (value) => {

        return formatCurrency(
            value,
            currency,
            usdToInr
        );

    };

    return (

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

            {/* ==============================
                PORTFOLIO ALLOCATION
            ============================== */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

                <div className="mb-6">

                    <h2 className="text-2xl font-black text-white">
                        📊 Portfolio Allocation
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Current portfolio distribution by holding.
                    </p>

                </div>

                <div className="h-[320px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={allocationData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={75}
                                outerRadius={115}
                                paddingAngle={3}
                                stroke="#0f172a"
                                strokeWidth={2}
                            >

                                {allocationData.map(
                                    (_, index) => (

                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                ALLOCATION_COLORS[
                                                    index %
                                                    ALLOCATION_COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>

                            <Tooltip
                                formatter={tooltipFormatter}
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "12px",
                                    color: "#ffffff"
                                }}
                            />

                            <Legend
                                wrapperStyle={{
                                    color: "#cbd5e1"
                                }}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* ==============================
                INVESTMENT VS CURRENT VALUE
            ============================== */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

                <div className="mb-6">

                    <h2 className="text-2xl font-black text-white">
                        📈 Investment vs Current Value
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Compare your invested capital with current value.
                    </p>

                </div>

                <div className="h-[320px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={comparisonData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 10
                            }}
                        >

                            <CartesianGrid
                                stroke="#334155"
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: "#94a3b8"
                                }}
                                axisLine={{
                                    stroke: "#475569"
                                }}
                            />

                            <YAxis
                                tick={{
                                    fill: "#94a3b8"
                                }}
                                axisLine={{
                                    stroke: "#475569"
                                }}
                                tickFormatter={(value) =>
                                    formatCurrency(
                                        value,
                                        currency,
                                        usdToInr
                                    )
                                }
                            />

                            <Tooltip
                                formatter={tooltipFormatter}
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "12px",
                                    color: "#ffffff"
                                }}
                            />

                            <Legend />

                            {/* Investment */}

                            <Bar
                                dataKey="investment"
                                name="Investment"
                                fill="#ef4444"
                                radius={[6, 6, 0, 0]}
                            />

                            {/* Current Value */}

                            <Bar
                                dataKey="currentValue"
                                name="Current Value"
                                fill="#22c55e"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );
}