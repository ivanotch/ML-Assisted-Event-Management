'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface DataItem {
  factor: string;
  count: number;
}

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"]; // blue, amber, red

export default function RiskFactorPie({ data }: { data: DataItem[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border w-full h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Risk Factor Distribution
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="factor"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50} // 🔥 makes it a donut chart (more modern)
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}