import CalendarPage from "./CalendarClient";
import { getAllEvents } from "@/app/actions/eventActions";

export default async function Page() {
  const eventsData = await getAllEvents();

  // ✅ sanitize for client (remove null issues, Firestore types)
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

  return <CalendarPage initialEvents={safeEvents} />;
}