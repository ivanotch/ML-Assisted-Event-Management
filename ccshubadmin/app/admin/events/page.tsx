import EventClient from "./EventClient";
import { getAllEvents } from "@/app/actions/eventActions";
import { getAllSchoolYear } from "@/app/actions/schoolYearActions";

export default async function Page() {
  const [eventsData, schoolYearsData] = await Promise.all([
    getAllEvents(),
    getAllSchoolYear(),
  ]);

  // ✅ Clean events (remove nulls, Firestore refs, etc.)
  const safeEvents = eventsData.map((event) => ({
    id: event.id,
    title: event.title ?? "",
    description: event.description ?? "",

    date: event.date ?? null,
    start_time: event.start_time ?? "",
    end_time: event.end_time ?? "",

    imageUrl: event.imageUrl ?? "",
    price: event.price ?? 0,

    department: event.department ?? "",
    participant_type: event.participant_type ?? "",
    location: event.location ?? "",
    requirements: event.requirements ?? "",

    attendeesLimit: event.attendeesLimit ?? null,
    status: event.status ?? "",

    createdAt: event.createdAt ?? null,
    school_year_id: event.school_year_id ?? null,
  }));

  // ✅ Clean school years
  const safeSchoolYears = schoolYearsData.map((sy) => ({
    id: sy.id,
    start_year: sy.start_year ?? "",
    end_year: sy.end_year ?? "",
    is_active: sy.is_active ?? false,
  }));

  return (
    <EventClient
      initialEvents={safeEvents}
      schoolYears={safeSchoolYears}
    />
  );
}