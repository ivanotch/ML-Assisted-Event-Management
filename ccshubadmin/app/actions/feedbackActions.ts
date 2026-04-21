'use server'
import { getDocs, query, where, collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type EventFeedback = {
    id: string

    event_id: string
    user_id: string

    submitted_at: any // Firestore Timestamp (we'll refine below)

    engagement_feedback: {
        engagement_level: number
        nps_score: number
        participated: boolean
        future_interest: string
    }

    attendance_feedback: {
        attendance_status: string
        reason: string[]
        heard_from: string
    }

    feedback_text: {
        negative_text: string
        experience: string
        positive_text: string
        suggestion: string
    }

    feedback_rating: {
        organization_rate: number
        venue_rate: number
        overall_rate: number
        relevance_rate: number
        engagement_rate: number
        management_rate: number
        content_rate: number
    }
}

export async function getAllAttendanceBySectionId({ eventId, sectionId }: { eventId: string, sectionId: string }) {
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

export async function getAllResponseByEventId(
    eventId: string
): Promise<EventFeedback[]> {

    const q = query(
        collection(db, "event_feedback"),
        where("event_id", "==", eventId)
    )

    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<EventFeedback, "id">

        return {
            id: doc.id,
            ...data,

            submitted_at:
                data.submitted_at?.toDate?.().toISOString() || null,

        }
    })
}

export async function createAnnouncement(formData: FormData) {
  const title = String(formData.get('title'))
  const description = String(formData.get('description'))
  const forTarget = String(formData.get('for'))
  const type = String(formData.get('type'))

  if (!title || !description) {
    throw new Error('Missing required fields')
  }

  await addDoc(collection(db, 'announcement'), {
    title,
    description,
    for: forTarget,
    type,
    date: Timestamp.now(),
  })
}