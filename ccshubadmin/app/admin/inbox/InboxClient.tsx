'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Bell, Clock, Megaphone, Users, Send } from 'lucide-react';
import Modal from '@/component/Modal';
import { startOfDay, endOfDay } from "date-fns";
import { createAnnouncement } from '@/app/actions/feedbackActions'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { deleteAnnouncement } from '@/app/actions/announcementAction';
import { Trash2 } from 'lucide-react';

type Announcement = {
    id: string
    title: string
    description: string
    for: string
    type: string
    date: string | null
}

export default function InboxClient() {
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const q = query(
            collection(db, 'announcement'),
            orderBy('date', 'desc')
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: Announcement[] = snapshot.docs.map((doc) => {
                const d = doc.data()

                return {
                    id: doc.id,
                    title: d.title ?? "",
                    description: d.description ?? "",
                    for: d.for ?? "",
                    type: d.type ?? "",
                    date: d.date?.toDate().toISOString() ?? null,
                }
            })

            setAnnouncements(data)
        })

        return () => unsubscribe()
    }, [])

    const systems = announcements.filter(
        (item) => item.type === "System"
    );

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const totalTodayAnnouncements = announcements.filter((item) => {
        if (!item.date) return false

        const date = new Date(item.date)

        return date >= startOfDay(new Date()) &&
            date <= endOfDay(new Date())
    }).length

    return (
        <div className="h-full flex flex-col p-6 max-w-7xl mx-auto gap-6 font-[inter]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inbox & Announcements</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage notifications and broadcast messages.</p>
                </div>
                <Button onClick={() => setIsComposeOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Announcement
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden min-h-0">
                {/* Left Column - Stats/Quick Actions */}
                <div className="lg:col-span-1 flex flex-col gap-6 overflow-hidden">
                    <div className="p-5 bg-gradient-to-br rounded-xl from-indigo-500 to-indigo-600 text-white border-transparent">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">Total Sent</p>
                                <h3 className="text-3xl font-bold mt-1">{totalTodayAnnouncements}</h3>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Megaphone className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
                        <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex items-center gap-2">
                            <Bell className="h-4 w-4 text-gray-500" />
                            Recent System Alerts
                        </div>
                        <div className="divide-y divide-gray-100">
                            {systems.map((i) => (
                                <div key={i.id} className="p-4 text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                                    <p className="font-medium text-gray-900">{i.title}</p>
                                    <p className="text-gray-500 mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {i.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Announcement History */}
                <div className="lg:col-span-2 flex flex-col overflow-hidden">
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900">Announcement History</h2>
                        </div>
                        <div className="p-5 space-y-6 overflow-y-auto flex-1">
                            {announcements.map((announcement) => (
                                <div key={announcement.id} className="relative pl-6 pb-6 border-l-2 border-indigo-100 last:border-0 last:pb-0">
                                    <div className="absolute -left-2 top-0 h-4 w-4 rounded-full border-2 border-white bg-indigo-500"></div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900 text-base">{announcement.title}</h3>
                                            <span className="text-xs text-gray-500">
                                                {announcement.date
                                                    ? new Date(announcement.date).toLocaleDateString()
                                                    : "No date"}
                                            </span>                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{announcement.description}</p>
                                        <div className='flex justify-between'>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="default" className="text-xs font-normal">
                                                    Type: {announcement.type}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Users className="h-3.5 w-3.5" />
                                                    To: {announcement.for}
                                                </div>
                                            </div>
                                            <button className='p-2 bg-gray-100 rounded-md hover:bg-red-200' onClick={() => setSelectedAnnouncement(announcement)}>
                                                <Trash2 size={20} color='red' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} title="Create Announcement" maxWidth="lg">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()

                        const form = e.currentTarget // ✅ capture BEFORE await
                        const formData = new FormData(form)

                        setLoading(true)

                        try {
                            await createAnnouncement(formData)

                            // ✅ reset safely
                            form.reset()

                            // ✅ close modal
                            setIsComposeOpen(false)
                        } catch (err) {
                            console.error(err)
                        } finally {
                            setLoading(false)
                        }
                    }}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Recipient Type</label>
                        <select name='for' className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="All">All</option>
                            <option value="Student">Student</option>
                            <option value="Student Committee">Student Organization</option>
                            <option value="Faculty">Faculty</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Announcement Type</label>
                        <select name='type' className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="General">General</option>
                            <option value="System">System</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Input name='title' placeholder="Announcement subject" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <Textarea name='description' rows={6} placeholder="Write your announcement here..." />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button variant="ghost" onClick={(e) => { e.preventDefault(); setIsComposeOpen(false); }}>Cancel</Button>
                        <Button type="submit" className="gap-2" disabled={loading}>
                            {loading ? "Sending..." : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Send Now
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                {loading && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50">
                        <div className="text-sm font-medium text-gray-700 animate-pulse">
                            Sending announcement...
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={!!selectedAnnouncement}
                onClose={() => {
                    if (!deleting) setSelectedAnnouncement(null)
                }}
                title="Delete Announcement?"
                maxWidth="md"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-gray-900">
                            {selectedAnnouncement?.title}
                        </span>?
                    </p>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            variant="ghost"
                            onClick={() => setSelectedAnnouncement(null)}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={async () => {
                                if (!selectedAnnouncement) return

                                setDeleting(true)

                                try {
                                    await deleteAnnouncement(selectedAnnouncement.id)

                                    // close modal
                                    setSelectedAnnouncement(null)
                                } catch (err) {
                                    console.error(err)
                                } finally {
                                    setDeleting(false)
                                }
                            }}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
                {deleting && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50">
                        <div className="text-sm font-medium text-gray-700 animate-pulse">
                            Deleting announcement...
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
