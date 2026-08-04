import { Clock, ArrowRight } from "lucide-react";

import Card from "../../ui/Card/Card";
import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import Section from "../../ui/Section/Section";
import EmptyState from "../../ui/EmptyState/EmptyState";

export default function RecentAnalysis({
    analyses = [],
    onViewAll,
}) {
    if (!analyses.length) {
        return (
            <Section
                title="Recent Analysis"
                subtitle="Your latest AI stock analyses"
            >
                <EmptyState
                    title="No analyses yet"
                    description="Analyze your first company to see it here."
                />
            </Section>
        );
    }

    return (
        <Section
            title="Recent Analysis"
            subtitle="Your latest AI stock analyses"
            action={
                <Button
                    variant="ghost"
                    onClick={onViewAll}
                >
                    View All
                    <ArrowRight size={16} />
                </Button>
            }
        >
            <div className="space-y-4">
                {analyses.slice(0, 5).map((item) => {
                    const badge =
                        item.recommendation === "BUY"
                            ? "success"
                            : item.recommendation === "HOLD"
                            ? "warning"
                            : "danger";

                    return (
                        <Card
                            key={item.id}
                            hover
                            className="flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {item.company}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    {item.symbol}
                                </p>
                            </div>

                            <Badge variant={badge}>
                                {item.recommendation}
                            </Badge>

                            <div className="hidden text-center md:block">
                                <p className="text-xl font-bold text-white">
                                    {item.confidence}%
                                </p>

                                <p className="text-xs text-slate-500">
                                    Confidence
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Clock size={16} />

                                {item.date}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
}