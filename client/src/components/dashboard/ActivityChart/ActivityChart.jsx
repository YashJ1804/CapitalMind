import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
} from "recharts";

import Card from "../../ui/Card/Card";
import Section from "../../ui/Section/Section";
import EmptyState from "../../ui/EmptyState/EmptyState";

export default function ActivityChart({
    data = [],
    title = "Analysis Activity",
    subtitle = "Your recent activity",
}) {
    if (!data.length) {
        return (
            <Section
                title={title}
                subtitle={subtitle}
            >
                <EmptyState
                    title="No activity yet"
                    description="Start analyzing companies to build your activity history."
                />
            </Section>
        );
    }

    return (
        <Section
            title={title}
            subtitle={subtitle}
        >
            <Card>
                <div className="h-72">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <AreaChart data={data}>
                            <XAxis
                                dataKey="day"
                                stroke="#94a3b8"
                            />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="analyses"
                                stroke="#3b82f6"
                                fill="#3b82f633"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </Section>
    );
}