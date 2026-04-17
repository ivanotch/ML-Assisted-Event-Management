
import React from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { getEventById } from '@/app/actions/eventActions'

export default async function page({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params

    const selectedEvent = await getEventById(eventId)

    if (!selectedEvent) {
        return <div>Event not found</div>
    }

    const snapshot = await getDocs(query(collection(db, 'sections'), where('department', '==', selectedEvent.department)))

    const sections = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            name: data.name ?? '',
            program_ref: data.program_id ?? null,
            school_year_ref: data.school_year_id ?? null,
            year_level: data.year_level ?? 0
        }
    })

    console.log(sections)

    return (
        <div>
            Display Section
        </div>
    )
}
