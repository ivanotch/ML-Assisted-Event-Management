'use client'

import { useEffect, useState } from 'react'
import FeedbackClient from './FeedbackClient'
import { getAllEvents } from '@/app/actions/eventActions'
import { Event } from '@/types/events'

export default function Page() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents()
        setEvents(data)
      } catch (err) {
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return <div className="p-6">Loading feedback...</div>
  }

  return <FeedbackClient initialEvents={events} />
}