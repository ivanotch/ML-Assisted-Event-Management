
import EventClient from './EventClient'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event } from "@/types/events"
import { Timestamp } from "firebase/firestore"

export default async function Page() {
    const snapshot = await getDocs(collection(db, "events"))

    const events: Event[] = snapshot.docs.map(doc => {
        const data = doc.data()

        return {
            id: doc.id,
            title: data.title ?? '',
            description: data.description ?? '',
            date: data.date ?? '',
            start_time: data.start_time ?? '',
            end_time: data.end_time ?? '',
            imageUrl: data.imageUrl ?? '',
            price: data.price ?? 0,
            department: data.department ?? '',
            participant_type: data.participant_type ?? '',
            location: data.location ?? '',
            requirements: data.requirements ?? '',
            attendeesLimit: data.attendeesLimit ?? null,
            status: data.status ?? 'Upcoming',

            // ✅ FIX HERE
            createdAt: data.createdAt instanceof Timestamp
                ? data.createdAt.toDate().toISOString()
                : null
        }
    })

    return <EventClient initialEvents={events} />
}