'use client'

interface DataItem {
  event: string;
  predicted: number;
  actual: number;
}

export default function AttendancePredictionTable({ data }: { data: DataItem[] }) {

  const getAccuracy = (predicted: number, actual: number) => {
    const diff = Math.abs(actual - predicted);
    return ((1 - diff / actual) * 100).toFixed(1);
  };

  const getVariance = (predicted: number, actual: number) => {
    return actual - predicted;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Attendance Prediction Accuracy
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="py-3 px-1">Event</th>
              <th className="py-3 px-1 text-center">Predicted</th>
              <th className="py-3 px-1 text-center">Actual</th>
              <th className="py-3 px-1 text-center">Variance</th>
              <th className="py-3 px-1 text-center">Accuracy</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              const variance = getVariance(item.predicted, item.actual);
              const accuracy = getAccuracy(item.predicted, item.actual);

              return (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium text-gray-700">
                    {item.event}
                  </td>

                  <td className="py-4 text-center text-gray-600">
                    {item.predicted}
                  </td>

                  <td className="py-4 text-center text-gray-600">
                    {item.actual}
                  </td>

                  {/* Variance */}
                  <td
                    className={`py-4 text-center font-medium ${
                      variance > 0
                        ? "text-green-600"
                        : variance < 0
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {variance > 0 ? `+${variance}` : variance}
                  </td>

                  {/* Accuracy */}
                  <td className="py-4 text-center">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 font-medium">
                      {accuracy}%
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