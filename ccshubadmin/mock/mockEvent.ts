'use client'
import { useState } from 'react';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Ended';

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string or readable
  time: string;
  location: string;
  status: EventStatus;
  description: string;
  image: string;
}

export interface Student {
  id: string;
  name: string;
  section: string;
  avatar: string;
}

export interface Attendance {
  eventId: string;
  students: Student[];
}

export interface Feedback {
  id: string;
  studentName: string;
  eventName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  date: string;
  recipients: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Symposium 2026',
    date: '2026-05-15',
    time: '09:00 AM - 05:00 PM',
    location: 'Main Auditorium',
    status: 'Upcoming',
    description: 'A university-wide technology conference featuring guest speakers from top tech companies, student project showcases, and networking opportunities.',
    image: 'https://images.unsplash.com/photo-1699962700166-be0200d7bf97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMGV2ZW50fGVufDF8fHx8MTc3NDk1MjU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Inter-College Sports Fest',
    date: '2026-04-10',
    time: '08:00 AM - 08:00 PM',
    location: 'University Stadium',
    status: 'Ongoing',
    description: 'The biggest sports event of the year, bringing together athletes from all departments to compete in track and field, basketball, and volleyball.',
    image: 'https://images.unsplash.com/photo-1764050359179-517599dab87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBldmVudCUyMHN0YWRpdW18ZW58MXx8fHwxNzc0OTQwNzI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Spring Student Mixer',
    date: '2026-03-20',
    time: '06:00 PM - 10:00 PM',
    location: 'Student Union Plaza',
    status: 'Ended',
    description: 'A casual gathering for students to meet peers from different majors, enjoy live music, and partake in fun activities.',
    image: 'https://images.unsplash.com/photo-1769973230372-f94140179752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZ2F0aGVyaW5nJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3NzUwMjQ4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Class of 2025 Graduation',
    date: '2025-06-15',
    time: '10:00 AM - 02:00 PM',
    location: 'Grand Hall',
    status: 'Ended',
    description: 'Commencement ceremony for the graduating class of 2025.',
    image: 'https://images.unsplash.com/photo-1738949538812-aebbb54a0592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc3NTAyNDMwMHww&ixlib=rb-4.1.0&q=80&w=1080',
  }
];

export const mockStudents: Student[] = [
  { id: 's1', name: 'Alice Johnson', section: 'Computer Science - A', avatar: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=100' },
  { id: 's2', name: 'Bob Smith', section: 'Computer Science - A', avatar: 'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?w=100' },
  { id: 's3', name: 'Charlie Davis', section: 'Business Admin - B', avatar: 'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?w=100' },
  { id: 's4', name: 'Diana Prince', section: 'Business Admin - B', avatar: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=100' },
  { id: 's5', name: 'Evan Wright', section: 'Engineering - C', avatar: 'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?w=100' },
];

export const mockFeedback: Feedback[] = [
  { id: 'f1', studentName: 'Alice Johnson', eventName: 'Spring Student Mixer', rating: 5, comment: 'Amazing event! Loved the live music.', date: '2026-03-21' },
  { id: 'f2', studentName: 'Bob Smith', eventName: 'Spring Student Mixer', rating: 4, comment: 'Good food, but it got a bit crowded.', date: '2026-03-21' },
  { id: 'f3', studentName: 'Charlie Davis', eventName: 'Class of 2025 Graduation', rating: 5, comment: 'Very well organized ceremony.', date: '2025-06-16' },
  { id: 'f4', studentName: 'Diana Prince', eventName: 'Spring Student Mixer', rating: 3, comment: 'Music was too loud to talk to people.', date: '2026-03-22' },
];

export const mockAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Welcome to the New Semester', message: 'We are excited to welcome everyone back to campus! Please check the events calendar for orientation week activities.', type: 'General', date: '2026-01-10', recipients: 'All Students' },
  { id: 'a2', title: 'Tech Symposium Registration Open', message: 'Registration for the Annual Tech Symposium is now open. Secure your spot today!', type: 'Student Achievers', date: '2026-04-01', recipients: 'Computer Science Dept' },
];

export const mockConversations: Conversation[] = [
  { id: 'c1', name: 'Student Council', avatar: '', lastMessage: 'Are we ready for the festival?', time: '10:30 AM', unread: 3, isGroup: true },
  { id: 'c2', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=100', lastMessage: 'Can I get more info about the hackathon?', time: 'Yesterday', unread: 0, isGroup: false },
  { id: 'c3', name: 'Faculty Members', avatar: '', lastMessage: 'Please review the event guidelines.', time: 'Monday', unread: 0, isGroup: true },
];

export const mockMessages: Message[] = [
  { id: 'm1', conversationId: 'c1', senderId: 's1', text: 'Has the budget been approved?', timestamp: '10:00 AM' },
  { id: 'm2', conversationId: 'c1', senderId: 'admin', text: 'Yes, I just sent the confirmation email.', timestamp: '10:15 AM' },
  { id: 'm3', conversationId: 'c1', senderId: 's3', text: 'Are we ready for the festival?', timestamp: '10:30 AM' },
];

export const useMockStore = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  
  // Handlers for mocked operations
  const addEvent = (event: Event) => setEvents([...events, event]);
  const deleteEvent = (id: string) => setEvents(events.filter(e => e.id !== id));
  const updateEvent = (updated: Event) => setEvents(events.map(e => e.id === updated.id ? updated : e));

  return {
    events,
    addEvent,
    deleteEvent,
    updateEvent,
    students: mockStudents,
    feedback: mockFeedback,
    announcements: mockAnnouncements,
    conversations: mockConversations,
    messages: mockMessages,
  };
};
