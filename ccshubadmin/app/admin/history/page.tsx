'use client'
import React from 'react';
import { Calendar, Users, MapPin, Search } from 'lucide-react';
import { mockEvents } from '@/mock/mockEvent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';



export default function History() {
    const pastEvents = mockEvents.filter(e => e.status === 'Ended');

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Event History</h1>
                    <p className="text-gray-500 text-sm mt-1">Review past events, attendance, and summaries.</p>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search past events..." className="pl-9" />
                </div>
                <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                </select>
            </div>

            <div className="space-y-4">
                {pastEvents.map((event) => (
                    <div key={event.id} className="overflow-hidden hover:border-indigo-200 transition-colors cursor-pointer group">
                        <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-64 h-48 sm:h-auto relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                <div className="absolute top-3 right-3">
                                    <Badge className="bg-white/90 backdrop-blur-md text-gray-800 shadow-sm border border-gray-100">Ended</Badge>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{event.description}</p>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                                        <Users className="h-4 w-4" />
                                        <span>342 Attendees</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
