'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { createEvents } from '@/app/actions/eventActions'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase";
import { Event } from '@/types/events'
import EventCard from './Card'
import SearchBar from '../../../component/SearchBar'
import { SchoolYears } from '@/types/schoolyears'

export default function EventClient({ initialEvents, schoolYears }: { initialEvents: Event[], schoolYears: SchoolYears[] }) {
    const [events, setEvents] = useState(initialEvents)
    const [search, setSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null)


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

                <Button className="bg-blue-700 flex items-center gap-2 text-lg p-5" onClick={() => setIsOpen(true)}>
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

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">

                        <h2 className="text-2xl font-bold mb-4">Add Event</h2>

                        <form className="space-y-4" action={async (formData) => {
                            if (!imageFile) {
                                alert("Image required")
                                return
                            }

                            // upload here BEFORE calling server action
                            const storageRef = ref(storage, `events/${Date.now()}-${imageFile.name}`)
                            await uploadBytes(storageRef, imageFile)
                            const url = await getDownloadURL(storageRef)

                            formData.append("imageUrl", url)

                            await createEvents(formData)

                            router.refresh()
                            setIsOpen(false)
                        }}>

                            {/* Title */}
                            <input name='title' type="text" placeholder="Event Title" className="w-full border p-2 rounded" />

                            {/* Description */}
                            <textarea name='description' placeholder="Description" className="w-full border p-2 rounded" />

                            {/* Date */}
                            <input name='date' type="date" className="w-full border p-2 rounded" />

                            {/* Time */}
                            <div className="flex gap-2">
                                <input name='start_time' type="time" className="w-full border p-2 rounded" />
                                <input name='end_time' type="time" className="w-full border p-2 rounded" />
                            </div>

                            {/* Image */}
                            <input
                                className='border-1 w-full p-2 bg-gray-200'
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) setImageFile(file)
                                }}
                            />

                            {/* Price */}
                            <input name='price' type="number" placeholder="Price (optional)" className="w-full border p-2 rounded" />

                            {/* Department */}
                            <select name='department' className="w-full border p-2 rounded">
                                <option>ITSA</option>
                                <option>COMSA</option>
                                <option>All</option>
                            </select>

                            {/* Participant Type */}
                            <select name='participant_type' className="w-full border p-2 rounded">
                                <option>All</option>
                                <option>Faculty</option>
                                <option>Student Committee</option>
                                <option>Students</option>
                            </select>

                            <select name="school_year_id" className="w-full border p-2 rounded">
                                {schoolYears.map((sy) => (
                                    <option key={sy.id} value={sy.id}>
                                        {sy.start_year}-{sy.end_year}
                                    </option>
                                ))}
                            </select>

                            {/* Location */}
                            <input name='location' type="text" placeholder="Location" className="w-full border p-2 rounded" />

                            {/* Requirements */}
                            <textarea name='requirements' placeholder="Requirements" className="w-full border p-2 rounded" />

                            {/* Attendees Limit */}
                            <input name='attendees_limit' type="number" placeholder="Attendees Limit (optional)" className="w-full border p-2 rounded" />

                            {/* Buttons */}
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button disabled={uploading} type="submit" className="bg-blue-700">
                                    {uploading ? "Uploading..." : "Save Event"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}