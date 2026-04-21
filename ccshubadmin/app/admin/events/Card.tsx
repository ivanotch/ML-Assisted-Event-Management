'use client'
import React from 'react'
import { CalendarDays, Clock10, MapPin, SquarePen, Trash2 } from 'lucide-react'
import Image from "next/image"
import { Event } from "@/types/events"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DeleteButton from './DeleteBtn'

export default function EventCard({ event }: { event: Event }) {
    const router = useRouter()

    return (
        <Link href={`/admin/events/${event.id}`}>
            <div className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer rounded-xl border">

                {/* Image */}
                <div className="h-48 relative overflow-hidden bg-gray-100">
                    <Image
                        src={event.imageUrl || "/placeholder.jpg"}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                        className="object-cover"
                        loading='eager'
                    />

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 text-xs rounded">
                        {event.status}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>

                    <div className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                                {event.date
                                    ? new Date(event.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })
                                    : 'No date'}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock10 className="h-4 w-4" />
                            <span>{event.start_time}</span>
                            -
                            <span>{event.end_time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t flex justify-end gap-2">
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            router.push(`/admin/events/${event.id}/edit`)
                        }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg z-10">
                            <SquarePen className="h-4 w-4" />
                        </button>
                        <DeleteButton iconClassName={'h-4 w-4'} className={'p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg'} id={event.id} imageUrl={event.imageUrl} />
                    </div>
                </div>
            </div>
        </Link>
    )
}