'use client'

import { useEffect, useState, use } from "react"
import { getEventById } from "@/app/actions/eventActions"
import EditEventForm from "./EditClient"
import { Event } from "@/types/events"

export default function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)   // ✅ IMPORTANT FIX

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id)
        setEvent(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!event) return <div>Not found</div>

  return <EditEventForm event={event} />
}