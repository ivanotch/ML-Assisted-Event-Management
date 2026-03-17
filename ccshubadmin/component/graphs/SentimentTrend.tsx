"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface DataItem {
    event: string;
    date: string;
    sentimentScore: number;
}

export default function SentimentLineChart({
    data,
}: {
    data: DataItem[];
}) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border w-full pb-11">
            <h2 className="text-lg font-semibold mb-4">
                Sentiment Trend Over Time
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    {/* Grid */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X Axis (Date) */}
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) =>
                            new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })
                        }
                    />

                    {/* Y Axis */}
                    <YAxis domain={[0, 1]} />

                    {/* Tooltip */}
                    <Tooltip
                        labelFormatter={(label) =>
                            new Date(label).toLocaleDateString()
                        }
                        formatter={(value, _, props) => [
                            `${value} (${props.payload.event})`,
                            "Sentiment",
                        ]}
                    />

                    {/* Line */}
                    <Line
                        type="monotone"
                        dataKey="sentimentScore"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}