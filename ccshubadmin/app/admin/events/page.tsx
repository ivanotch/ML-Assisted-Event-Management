'use client'

import { useEffect, useState } from 'react'
import EventClient from './EventClient'
import { getAllEvents } from '@/app/actions/eventActions'
import { getAllSchoolYear } from '@/app/actions/schoolYearActions'
import { Event } from '@/types/events'
import { SchoolYears } from '@/types/schoolyears'

export default function Page() {
    const [events, setEvents] = useState<Event[]>([])
    const [schoolYears, setSchoolYears] = useState<SchoolYears[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsData, schoolYearsData] = await Promise.all([
                    getAllEvents(),
                    getAllSchoolYear()
                ])

                setEvents(eventsData)
                setSchoolYears(schoolYearsData)
            } catch (err) {
                console.error("Error fetching data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <div className="p-6">Loading events...</div>
    }

    return (
        <EventClient 
            initialEvents={events} 
            schoolYears={schoolYears} 
        />
    )
}