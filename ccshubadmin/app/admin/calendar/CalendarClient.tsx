'use client'
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
// import { mockEvents, type Event } from '@/mock/mockEvent';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/events';
import Image from 'next/image';

export default function CalendarPage({ initialEvents }: { initialEvents: Event[] }) {
    const [event, setEvents] = useState(initialEvents)
    const [currentDate, setCurrentDate] = useState(new Date()); // Setting context to match mock data
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "MMMM yyyy";
    const days = [];
    let day = startDate;
    let formattedDate = "";

    useEffect(() => {
        setEvents(initialEvents)
    }, [initialEvents])

    // Calendar rendering logic
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            const cloneDay = day;

            // Find events for this day
            const dayEvents = event.filter(e => {
                if (!e.date) return false;
                const eventDate = new Date(e.date);
                return isSameDay(eventDate, cloneDay);
            });

            days.push(
                <div
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(cloneDay)}
                    className={`min-h-[100px] border border-gray-100 p-2 transition-colors cursor-pointer ${!isSameMonth(day, monthStart)
                        ? "bg-gray-50 text-gray-400"
                        : isSameDay(day, selectedDate)
                            ? "bg-indigo-50"
                            : "bg-white hover:bg-gray-50 text-gray-900"
                        }`}
                >
                    <div className="flex justify-between items-start">
                        <span className={`text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full ${isSameDay(day, new Date()) ? 'bg-indigo-600 text-white' : ''
                            }`}>
                            {formattedDate}
                        </span>
                        {dayEvents.length > 0 && (
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1 md:hidden"></span>
                        )}
                    </div>
                    <div className="mt-1 space-y-1 hidden md:block">
                        {dayEvents.map(e => (
                            <div
                                key={e.id}
                                onClick={(ev) => { ev.stopPropagation(); setSelectedEvent(e); }}
                                className="text-xs truncate bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
                            >
                                {e.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
    }

    // Group events by date for mobile view or side panel
    const selectedDateEvents = event.filter(e => {
        if (!e.date) return false;
        return isSameDay(new Date(e.date), selectedDate);
    });
    return (
        <div className="p-6 max-w-7xl mx-auto flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                    <p className="text-gray-500 text-sm mt-1">Schedule and manage all university events.</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                <div className="lg:col-span-3 flex flex-col overflow-hidden bg-white shadow-sm h-full">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">{format(currentDate, dateFormat)}</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(2026, 3, 15))}>Today</Button>
                            <Button variant="outline" size="sm" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
                        {days}
                    </div>
                </div>

                {/* Side Panel for Selected Date */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <div className="p-5 flex-1 overflow-y-auto">
                        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            Events for {format(selectedDate, 'MMM d, yyyy')}
                        </h3>

                        {selectedDateEvents.length > 0 ? (
                            <div className="space-y-4">
                                {selectedDateEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        <div className="text-xs font-medium text-indigo-600 mb-1">{event.start_time}</div>
                                        <div className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-indigo-700">{event.title}</div>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                {/* variant={event.status === 'Ongoing' ? 'success' : event.status === 'Ended' ? 'default' : 'warning'} */}
                                                {event.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <div className="text-gray-400 mb-2">📅</div>
                                <p className="text-sm text-gray-500">No events scheduled for this day.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Event Quick View Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg">

                        <h2 className="text-lg font-bold mb-4">Event Details</h2>

                        <div className="h-40 relative">
                            <Image
                                src={selectedEvent.imageUrl || "/placeholder.jpg"}
                                alt="event image"
                                fill
                                className="object-cover rounded"
                                sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                            />
                        </div>
                        <p className="font-semibold">{selectedEvent.title}</p>
                        <p className="text-sm text-gray-500">{selectedEvent.location}</p>

                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
