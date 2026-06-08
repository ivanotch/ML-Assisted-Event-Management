import {
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

type UserConversation = {
    id: string;
    conversationId: string;
    otherUserId: string;
    unreadCount: number;
    otherAvatarUrl: string;
    otherUserName: string;
    updated_at: any;
    lastMessage: {
        text: string;
        senderId: string;
        created_at: any;
    };
};

type Message = {
    id: string;
    created_at: any;
    senderId: string;
    text: string;
}


export const subscribeToConversations = (
    uid: string,
    callback: (data: UserConversation[]) => void
) => {
    const q = query(
        collection(db, "userConversations", uid, "conversations"),
        orderBy("updated_at", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as UserConversation[];

        callback(data);
    });
};

export const subscribeToUserConversations = (activeConversationId: string, callBack: (data: Message[]) => void) => {
    const q = query(
        collection(db, "conversations", activeConversationId, "messages"),
        orderBy("created_at", "asc")
    );

    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Message[];

        callBack(data);
    })
}