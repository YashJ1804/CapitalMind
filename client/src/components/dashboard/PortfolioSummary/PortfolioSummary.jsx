import { Briefcase, TrendingUp, ArrowRight } from "lucide-react";

import Card from "../../ui/Card/Card";
import Section from "../../ui/Section/Section";
import Button from "../../ui/Button/Button";
import EmptyState from "../../ui/EmptyState/EmptyState";

export default function PortfolioSummary({
    portfolio,
    onViewPortfolio,
}) {
    if (!portfolio) {
        return (
            <Section
                title="Portfolio"
                subtitle="Your investment summary"
            >
                <EmptyState
                    title="No portfolio yet"
                    description="Start adding investments to track your portfolio."
                />
            </Section>
        );
    }

    const profit = portfolio.current - portfolio.invested;
    const positive = profit >= 0;

    return (
        <Section
            title="Portfolio Summary"
            subtitle="Current investment performance"
            action={
                <Button
                    variant="ghost"
                    onClick={onViewPortfolio}
                >
                    View Portfolio
                    <ArrowRight size={16} />
                </Button>
            }
        >
            <Card>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <div>
                        <p className="text-sm text-slate-400">
                            Holdings
                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-white">
                            {portfolio.holdings}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-slate-400">
                            Invested
                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-white">
                            ${portfolio.invested.toLocaleString()}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-slate-400">
                            Current Value
                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-white">
                            ${portfolio.current.toLocaleString()}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-slate-400">
                            Total P/L
                        </p>

                        <h3
                            className={`mt-2 text-3xl font-bold ${
                                positive
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {positive ? "+" : ""}
                            ${profit.toLocaleString()}
                        </h3>
                    </div>

                </div>

                <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5">

                    <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-blue-500/10 p-3">
                            <Briefcase className="text-blue-400" />
                        </div>

                        <div>

                            <p className="text-sm text-slate-400">
                                Top Performer
                            </p>

                            <h4 className="text-xl font-semibold text-white">
                                {portfolio.topPerformer.symbol}
                            </h4>

                        </div>

                    </div>

                    <div className="flex items-center gap-2 text-green-400">

                        <TrendingUp size={18} />

                        <span className="text-lg font-bold">
                            +{portfolio.topPerformer.gain}%
                        </span>

                    </div>

                </div>

            </Card>
        </Section>
    );
}