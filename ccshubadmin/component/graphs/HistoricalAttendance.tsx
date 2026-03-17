'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

interface DataItem {
  year: string;
  event: string;
  attendance: number;
}

export default function HistoricalAttendance({ data }: { data: DataItem[] }) {

  // Combine year + event for better labeling
  const formattedData = data.map(item => ({
    ...item,
    label: `${item.year} - ${item.event}`
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border w-full h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Historical Attendance Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            angle={-20}
            textAnchor="end"
            height={70}
          />

          <YAxis />

          <Tooltip
            formatter={(value) => `${value} attendees`}
            labelFormatter={(label) => `${label}`}
          />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}