'use client';
import React from 'react'
import { useState } from 'react';
import { mockEvents } from '@/mock/mockEvent'
import { Button } from '@/components/ui/button';



export default function Gallery() {

    const mockPhotos = [
        { id: '1', url: 'https://images.unsplash.com/photo-1699962700166-be0200d7bf97?w=800', eventId: '1', title: 'Tech Talk Keynote' },
        { id: '2', url: 'https://images.unsplash.com/photo-1764050359179-517599dab87b?w=800', eventId: '2', title: 'Basketball Finals' },
        { id: '3', url: 'https://images.unsplash.com/photo-1769973230372-f94140179752?w=800', eventId: '3', title: 'Crowd at Mixer' },
        { id: '4', url: 'https://images.unsplash.com/photo-1738949538812-aebbb54a0592?w=800', eventId: '4', title: 'Graduation Hats Toss' },
        { id: '5', url: 'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?w=800', eventId: '1', title: 'Student Presenting' },
        { id: '6', url: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=800', eventId: '3', title: 'Group Photo' },
    ];

    const [selectedEventId, setSelectedEventId] = useState<string>('all');
    const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

    const filteredPhotos = selectedEventId === 'all'
        ? mockPhotos
        : mockPhotos.filter(p => p.eventId === selectedEventId);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
                    <p className="text-gray-500 text-sm mt-1">View and manage photos from all events.</p>
                </div>
                <div className="flex gap-3 items-center w-full sm:w-auto">
                    <select
                        className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                    >
                        <option value="all">All Events</option>
                        {mockEvents.map(e => (
                            <option key={e.id} value={e.id}>{e.title}</option>
                        ))}
                    </select>
                    <Button variant="outline" className="shrink-0 gap-2">
                        <div className="h-4 w-4" />
                        <span className="hidden sm:inline">Export All</span>
                    </Button>
                </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                <div>
                    {filteredPhotos.map((photo) => {
                        const event = mockEvents.find(e => e.id === photo.eventId);
                        return (
                            <div
                                key={photo.id}
                                className="relative group rounded-xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm"
                                onClick={() => setLightboxPhoto(photo.url)}
                            >
                                <img src={photo.url} alt={photo.title} className="w-full h-auto object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white font-medium text-sm">{photo.title}</p>
                                        <p className="text-gray-300 text-xs mt-1">{event?.title}</p>
                                    </div>
                                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors">
                                        <div className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Lightbox */}
            <div>
                {lightboxPhoto && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/95 backdrop-blur-md p-4"
                        onClick={() => setLightboxPhoto(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
                            <span className="sr-only">Close</span>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <img
                            src={lightboxPhoto}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
