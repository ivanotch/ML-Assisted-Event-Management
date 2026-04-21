import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getEventById } from "@/app/actions/eventActions";
import SectionClient from "./SectionClient";

export default async function Page({
    params,
}: {
    params: Promise<{ eventId: string }>;
}) {
    const { eventId } = await params;

    // 🔥 lightweight fetch only for logic
    const event = await getEventById(eventId);

    if (!event) {
        return <div className="p-6">Event not found</div>;
    }


    let snapshot;

    if (event.department === "All") {
        snapshot = await getDocs(collection(db, "sections"));
    } else {
        snapshot = await getDocs(
            query(
                collection(db, "sections"),
                where("program_name", "==", event.department)
            )
        );
    }

    const sections = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name ?? "",
        program_id: doc.data().program_id?.id ?? null,
        school_year_id: doc.data().school_year_id?.id ?? null,
        year_level: doc.data().year_level ?? 0,
        program_name: doc.data().program_name ?? "",
    }));

    return <SectionClient eventId={eventId} sections={sections} />;
}