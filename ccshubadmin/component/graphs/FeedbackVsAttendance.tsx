'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

interface DataItem {
  event: string;
  attendees: number;
  feedback: number;
}

export default function FeedbackVsAttendance({ data }: { data: DataItem[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border w-full h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Feedback vs Attendance
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          layout="vertical" // 🔥 makes it horizontal
          margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X = values */}
          <XAxis type="number" />

          {/* Y = event names */}
          <YAxis
            dataKey="event"
            type="category"
            width={150}
          />

          <Tooltip />
          <Legend />

          {/* Bars */}
          <Bar dataKey="attendees" fill="#3b82f6" radius={[0, 6, 6, 0]} />
          <Bar dataKey="feedback" fill="#10b981" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}