'use client'

interface DataItem {
  event: string;
  performanceScore: number;
}

export default function TopEventsTable({ data }: { data: DataItem[] }) {

  // Sort descending (highest score first)
  const sortedData = [...data].sort(
    (a, b) => b.performanceScore - a.performanceScore
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Top Performing Events
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="py-3">Rank</th>
              <th className="py-3">Event</th>
              <th className="py-3 text-center">Performance Score</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((item, index) => {
              const rank = index + 1;

              return (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  {/* Rank */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        rank === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : rank === 2
                          ? "bg-gray-200 text-gray-700"
                          : rank === 3
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      #{rank}
                    </span>
                  </td>

                  {/* Event */}
                  <td className="py-4 font-medium text-gray-700">
                    {item.event}
                  </td>

                  {/* Score */}
                  <td className="py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                      {item.performanceScore}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}