// src/services/events.ts
import { collection, onSnapshot, doc, addDoc, serverTimestamp, updateDoc,
    query,
    where,
    getDocs, getDoc, setDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import {async} from "@firebase/util";
import {Event} from '../types/event'

interface SavedEventsData {
    id: string;
    title: string;
    imageUrl: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
}

interface Registration {
    id: string;
    checked_in: boolean;
    checked_out: boolean;
    event_id: string;
    payment_amount: number;
    payment_status: string;
    qr_value: string;
    registration_status: string;
    student_id: string;
    ticket_id: string;
    registered_at: any;
}

type SavedEventData = {
    id: string;
    title: string;
    imageUrl: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
};

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

export const registerForEvent = async (
    eventId: string,
    studentId: string,
    price: number
) => {
    const registrationRef = await addDoc(
        collection(db, "registrations"),
        {
            event_id: eventId,
            event_ref: doc(db, "events", eventId),

            student_id: studentId,
            student_ref: doc(db, "students", studentId),

            registration_status: "registered",

            payment_status:
                price > 0 ? "pending" : "waived",

            payment_amount: price,

            registered_at: serverTimestamp(),

            checked_in: false,
            checked_out: false,
        }
    );

    await updateDoc(registrationRef, {
        ticket_id: `TKT-${registrationRef.id.substring(0, 8).toUpperCase()}`,
        qr_value: `TKT-${registrationRef.id.substring(0, 8).toUpperCase()}`,
    });

    return registrationRef.id;
};

export const subscribeToRegistration = (
    registrationId: string,
    callback: (registration: any | null) => void
) => {
    const ref = doc(db, "registrations", registrationId);

    const unsubscribe = onSnapshot(ref, (snapshot) => {
        if (!snapshot.exists()) {
            callback(null);
            return;
        }

        callback({
            id: snapshot.id,
            ...snapshot.data(),
        });
    });

    return unsubscribe;
};

export const isStudentRegistered = async (
    eventId: string,
    studentId: string
) => {
    const q = query(
        collection(db, "registrations"),
        where("event_id", "==", eventId),
        where("student_id", "==", studentId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const registration = snapshot.docs[0];

    return {
        id: registration.id,
        ...registration.data(),
    };
};

export const fetchRegistrations = async (
    studentId: string
): Promise<Registration[]> => {

    const q = query(
        collection(db, "registrations"),
        where("student_id", "==", studentId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return [];
    }

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Registration[];
};

export const fetchAllEvents = async (): Promise<Event[]> => {

    const snapshot = await getDocs(
        collection(db, "events")
    );

    if (snapshot.empty) {
        return [];
    }

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, "id">),
    }));
};

export const saveEvent = async (
    userId: string,
    event: SavedEventData
) => {
    await setDoc(
        doc(db, "user", userId, "savedEvents", event.id),
        {
            eventId: event.id,
            title: event.title,
            imageUrl: event.imageUrl,
            date: event.date,
            start_time: event.start_time,
            end_time: event.end_time,
            location: event.location,
            savedAt: serverTimestamp(),
        }
    );
};

export const unsaveEvent = async (
    userId: string,
    eventId: string
) => {
    await deleteDoc(
        doc(db, "user", userId, "savedEvents", eventId)
    );
};

export const isEventSaved = async (
    userId: string,
    eventId: string
) => {
    const snap = await getDoc(
        doc(db, "user", userId, "savedEvents", eventId)
    );

    return snap.exists();
};

export const getSavedEventIds = async (
    userId: string
) => {
    const snapshot = await getDocs(
        collection(db, "user", userId, "savedEvents")
    );

    return new Set(
        snapshot.docs.map(doc =>
            doc.id
        )
    );
};

export const subscribeToSavedEvents = (
    userId: string,
    callback: (events: SavedEventsData[]) => void
) => {
    const unsubscribe = onSnapshot(
        collection(db, "user", userId, "savedEvents"),
        (snapshot) => {
            const events = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<SavedEventsData, "id">),
            }));

            callback(events);
        },
        (error) => {
            console.error(
                "Error listening to saved events:",
                error
            );
        }
    );

    return unsubscribe;
};