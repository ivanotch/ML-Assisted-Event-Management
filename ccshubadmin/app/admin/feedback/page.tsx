import FeedbackClient from './FeedbackClient'
import { getAllEvents } from '@/app/actions/eventActions'

export default async function Page() {
  const data = await getAllEvents()

  const safeEvents = data.map((event) => {
    const normalizeDate = (value: any): string | null => {
      if (!value) return null

      // Firestore Timestamp
      if (typeof value.toDate === 'function') {
        return value.toDate().toISOString()
      }

      // Already a Date object
      if (value instanceof Date) {
        return value.toISOString()
      }

      // Already a string (ISO or otherwise)
      if (typeof value === 'string') {
        return value
      }

      return null
    }

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: normalizeDate(event.date),
      start_time: event.start_time,
      end_time: event.end_time,
      imageUrl: event.imageUrl,
      price: event.price,
      department: event.department,
      participant_type: event.participant_type,
      location: event.location,
      requirements: event.requirements,
      attendeesLimit: event.attendeesLimit ?? 0,
      status: event.status,
      createdAt: normalizeDate(event.createdAt),
      school_year_id: event.school_year_id ?? "",
    }
  })

  return <FeedbackClient initialEvents={safeEvents} />
}