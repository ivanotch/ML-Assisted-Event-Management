// src/services/events.ts
import { collection, onSnapshot, doc, addDoc, serverTimestamp, updateDoc,
    query,
    where,
    getDocs, } from 'firebase/firestore';
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