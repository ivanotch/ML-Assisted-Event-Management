// src/services/events.ts
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export const subscribeToEvents = (callback: (events: any[]) => void) => {
    return onSnapshot(collection(db, "events"), (snapshot) => {
        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(events);
    });
};

export const subscribeToEvent = (eventID: string, callback: (events: any | null) => void) => {
    const ref = doc(db, "events", eventID);

    return onSnapshot(ref, (snapshot) => {
        if (!snapshot.exists()) {
            callback(null);
            return;
        }

        callback({
            id: snapshot.id,
            ...snapshot.data(),
        });
    });
}