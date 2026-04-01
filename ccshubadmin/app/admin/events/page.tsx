'use client'
import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { mockEvents } from '@/mock/mockEvent'
import EventCard from './Card'
import SearchBar from './SearchBar'

export default function Events() {
    const [events] = useState(mockEvents)
    const [search, setSearch] = useState('')

    // ✅ optimized filtering
    const filteredEvents = useMemo(() => {
        return events.filter((e) => {
            const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase())
            const notEnded = e.status !== 'Ended'
            return matchesSearch && notEnded
        })
    }, [events, search])

    return (
        <div className="px-10 pt-5">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Manage Events</h1>
                    <p className="text-gray-600">Create, view and manage CCS events.</p>
                </div>

                <Button className="bg-blue-700 flex items-center gap-2 text-lg p-5">
                    <Plus />
                    Add Event
                </Button>
            </div>

            {/* Search */}
            <div className="mt-6 flex justify-between items-center">
                <SearchBar value={search} onChange={setSearch} />
            </div>

            {/* Events Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">
                        No events found.
                    </p>
                )}
            </div>
        </div>
    )
}