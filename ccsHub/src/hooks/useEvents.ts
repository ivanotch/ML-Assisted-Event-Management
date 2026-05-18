import { useEffect, useState } from 'react';
import { subscribeToEvent, subscribeToEvents} from '../services/events';
import { Event } from '../types/event'

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const unsubscribe = subscribeToEvents(setEvents);
        return unsubscribe;
    }, []);

    return { events };
};

export const useEvent = (id: string) => {
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (!id) return;

        const unsubscribe = subscribeToEvent(id, setEvent);

        return () => unsubscribe();
    }, [id]);

    return { event };
};