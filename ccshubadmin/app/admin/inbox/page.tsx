'use client'
import React, {useState} from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Bell, Clock, Megaphone, Users, Send} from 'lucide-react';
import { mockAnnouncements } from '@/mock/mockEvent';
import Modal from '@/component/Modal';

export default function Inbox() {
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Stats/Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-transparent">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm font-medium">Total Sent</p>
                                <h3 className="text-3xl font-bold mt-1">24</h3>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Megaphone className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm text-indigo-100">
                            <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                            All systems operational
                        </div>
                    </div>

                    <div className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex items-center gap-2">
                            <Bell className="h-4 w-4 text-gray-500" />
                            Recent System Alerts
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                                    <p className="font-medium text-gray-900">Database backup completed</p>
                                    <p className="text-gray-500 mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> 2 hours ago
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Announcement History */}
                <div className="lg:col-span-2">
                    <div className="h-full">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-900">Announcement History</h2>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                        <div className="p-5 space-y-6">
                            {mockAnnouncements.map((announcement) => (
                                <div key={announcement.id} className="relative pl-6 pb-6 border-l-2 border-indigo-100 last:border-0 last:pb-0">
                                    <div className="absolute -left-2 top-0 h-4 w-4 rounded-full border-2 border-white bg-indigo-500"></div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900 text-base">{announcement.title}</h3>
                                            <span className="text-xs text-gray-500">{new Date(announcement.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{announcement.message}</p>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="default" className="text-xs font-normal">
                                                Type: {announcement.type}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Users className="h-3.5 w-3.5" />
                                                To: {announcement.recipients}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} title="Create Announcement" maxWidth="lg">
                <form className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Recipient Type</label>
                        <select className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option>General (All Students)</option>
                            <option>Athletes</option>
                            <option>Student Committee</option>
                            <option>Faculty Members</option>
                            <option>Student Achievers</option>
                            <option>Specific Student...</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Input placeholder="Announcement subject" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <Textarea rows={6} placeholder="Write your announcement here..." />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button variant="ghost" onClick={(e) => { e.preventDefault(); setIsComposeOpen(false); }}>Cancel</Button>
                        <Button className="gap-2" onClick={(e) => { e.preventDefault(); setIsComposeOpen(false); }}>
                            <Send className="h-4 w-4" />
                            Send Now
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
