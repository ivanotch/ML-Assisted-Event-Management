"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DataItem {
  type: string;
  value: number;
}

export default function SentimentBarChart({ data }: { data: DataItem[] }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border w-full h-[350px]">
      <h2 className="text-lg font-semibold mb-4">
        Sentiment Distribution (All Events)
      </h2>

      <ResponsiveContainer className="pb-5" width="100%" height="100%">
        <BarChart data={data} >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis dataKey="type" />

          {/* Y Axis */}
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Bars */}
          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}