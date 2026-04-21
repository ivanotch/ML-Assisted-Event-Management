import getAllAttendanceBySectionId from "@/app/actions/feedbackActions";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string; sectionId: string }>;
}) {
  const { eventId, sectionId } = await params;

  const attendance = await getAllAttendanceBySectionId({
    eventId,
    sectionId,
  });

  // ✅ normalize timestamps
  const safeAttendance = attendance.map((item: any) => ({
    id: item.id,
    student_id: item.student_id,
    email: item.email,
    name: item.name,
    student_number: item.student_number,
    attended: item.attended,
    checkin_time: item.checkin_time?.toDate?.().toISOString() || null,
    checkout_time: item.checkout_time?.toDate?.().toISOString() || null,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold">Attendance</h1>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Check-in</th>
              <th className="px-4 py-3">Check-out</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {safeAttendance.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{item.student_number}</td>

                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      item.attended
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {item.attended ? "Present" : "Absent"}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {item.checkin_time
                    ? new Date(item.checkin_time).toLocaleString()
                    : "-"}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {item.checkout_time
                    ? new Date(item.checkout_time).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}

            {safeAttendance.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}