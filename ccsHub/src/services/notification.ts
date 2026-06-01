import {onSnapshot, collection} from "firebase/firestore";
import {db} from '../../src/lib/firebaseConfig'

type AnnouncementType = "System" | "General";

interface Announcement {
    id: string;
    title: string;
    type: AnnouncementType;
    for: string;
    description: string;
    date: string;
}

export const subscribeToAnnouncements = (
    callback: (announcements: Announcement[]) => void,
    onError?: (error: Error) => void
) => {
    return onSnapshot(
        collection(db, "announcement"),
        (snapshot) => {
            const announcements = snapshot.docs.map((doc) => {
                const data = doc.data();

                return {
                    id: doc.id,
                    ...data,
                    date: data.date?.toDate?.().toLocaleDateString() ?? "",
                };
            });

            callback(announcements as Announcement[]);
        },
        (error) => {
            console.error(error);
            onError?.(error);
        }
    );
};