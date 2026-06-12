import {
    collection,
    onSnapshot,
    orderBy,
    query,
    addDoc,
    increment,
    doc,
    updateDoc,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

type MessageData = {
    text: string;
    senderId: string;
    created_at: Timestamp | null;
};

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

export const sendMessageToConversation = async (
    activeConvId: string,
    senderId: string,
    receiverId: string,
    messageData: MessageData
) => {
    try {
        // 1. Add message to messages subcollection
        await addDoc(
            collection(db, "conversations", activeConvId, "messages"),
            {
                ...messageData,
                created_at: serverTimestamp(),
            }
        );

        // 2. Update main conversation
        await updateDoc(
            doc(db, "conversations", activeConvId),
            {
                lastMessage: {
                    ...messageData,
                    created_at: serverTimestamp(),
                },
                updated_at: serverTimestamp(),
            }
        );

        // 3. Update sender conversation
        await updateDoc(
            doc(
                db,
                "userConversations",
                senderId,
                "conversations",
                activeConvId
            ),
            {
                lastMessage: {
                    ...messageData,
                    created_at: serverTimestamp(),
                },
                updated_at: serverTimestamp(),
                unreadCount: 0,
            }
        );

        // 4. Update receiver conversation
        await updateDoc(
            doc(
                db,
                "userConversations",
                receiverId,
                "conversations",
                activeConvId
            ),
            {
                lastMessage: {
                    ...messageData,
                    created_at: serverTimestamp(),
                },
                updated_at: serverTimestamp(),
                unreadCount: increment(1),
            }
        );
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};