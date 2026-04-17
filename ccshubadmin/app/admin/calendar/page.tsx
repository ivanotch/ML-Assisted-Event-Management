'use client'

import React, { useEffect, useState } from 'react'
import CalendarPage from './CalendarClient'
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
                console.error("Failed to fetch events:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    if (loading) {
        return <div className="p-6">Loading events...</div>
    }

    return <CalendarPage initialEvents={events} />
}