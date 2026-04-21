'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { mockFeedback } from '@/mock/mockEvent';
import SearchBar from '@/component/SearchBar';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/events';
import Link from 'next/link';

type SafeEvent = {
    id: string
    title: string
    description: string
    date: string | null
    start_time: string
    end_time: string
    imageUrl: string
    price: number
    department: string
    participant_type: string
    location: string
    requirements: string
    attendeesLimit: number
    status: string
    createdAt: string | null
    school_year_id: string
}

export default function FeedbackClient({ initialEvents }: { initialEvents: SafeEvent[] }) {
    const [events, setEvents] = useState(initialEvents)
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const filteredEvent = events.filter(f =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setEvents(initialEvents)
    }, [initialEvents])

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 font-[inter]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Event Feedback</h1>
                    <p className="text-gray-500 text-sm mt-1">Review student feedback for past events.</p>
                </div>

                <Button onClick={() => {
                    router.push("/admin/feedback/form")
                }}>View Form</Button>
            </div>

            <div className="overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
                    <div className="mt-6 flex justify-between items-center">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500">
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars & Below</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">

                                <th className="px-6 py-4 font-medium">Event Name</th>
                                <th className="px-6 py-4 font-medium">Rating</th>
                                <th className="px-6 py-4 font-medium">Participant</th>
                                <th className="px-6 py-4 font-medium">Department</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white text-sm">
                            {filteredEvent.map((item) => (

                                <tr key={item.id} onClick={() => {
                                    router.push(`/admin/feedback/${item.id}/`)
                                }}
                                    className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < 5 ? 'fill-current' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{item.participant_type}</td>

                                    <td className="px-6 py-4 text-gray-600 max-w-md truncate">{item.department}</td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {item.date
                                            ? new Date(item.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })
                                            : 'No date'}
                                    </td>
                                </tr>
                            ))}
                            {filteredEvent.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No Event found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div>Showing {filteredEvent.length} entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
