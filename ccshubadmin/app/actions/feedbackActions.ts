'use server'
import { getDocs, query, where, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type ResponseBySection = {

}

export default async function getAllAttendanceBySectionId({ eventId, sectionId }: { eventId: string, sectionId: string }) {
    const attendanceSnap = await getDocs(
        query(
            collection(db, "event_attendance"),
            where("event_id", "==", eventId),
            where("section_id", "==", sectionId),
            where("attended", "==", true)
        )
    )

    const attendance = attendanceSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }))

    return attendance;
}