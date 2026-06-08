import { useEffect, useState } from "react";
import { subscribeToConversations, subscribeToUserConversations } from "../services/messages";


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

export const useConversations= (uid?: string) => {
    const [conversations, setConversations] = useState<UserConversation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            setLoading(false);
            return;
        }

        const unsubscribe = subscribeToConversations(
            uid,
            (data) => {
                setConversations(data);
                console.log(data);
                console.log(uid)
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [uid]);

    return {
        conversations,
        loading,
    };
}

export const useUserConversations = (
    conversationId?: string
) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!conversationId) {
            setLoading(false);
            return;
        }

        const unsubscribe =
            subscribeToUserConversations(
                conversationId,
                (data) => {
                    setMessages(data);
                    setLoading(false);
                }
            );

        return unsubscribe;
    }, [conversationId]);

    return {
        messages,
        loading,
    };
};