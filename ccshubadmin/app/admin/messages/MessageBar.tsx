'use client'
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore'

type UserConversation = {
    id: string;
    conversationId: string;
    otherUserId: string;
    unreadCount: number;
    otherUserAvatarUrl: string;
    otherUserName: string;
    updated_at: any;
    lastMessage: {
        text: string;
        senderId: string;
        created_at: any;
    };
};

export default function MessageBar({ activeConvId, setActiveConvId, setOtherUserInfo }: any) {
    const [conversations, setConversations] = useState<UserConversation[]>([]);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                console.log("No user");
                setConversations([]);
                return;
            }

            const uid = user.uid;
            console.log("UID:", uid);

            const ref = doc(db, "userConversations", uid);

            const unsubscribe = onSnapshot(ref, (snap) => {
                if (!snap.exists()) {
                    console.log("No userConversations doc");
                    setConversations([]);
                    return;
                }

                const data = snap.data();

                if (!data) {
                    setConversations([]);
                    return;
                }

                const conversation = {
                    id: uid, // or data.conversationId if you want
                    ...data
                };

                setConversations([conversation] as UserConversation[]);

                console.log("DATA:", data);
                console.log("CONV:", conversations);

            });

            return () => unsubscribe();
        });

        return () => unsubscribeAuth();
    }, []);
    console.log("Try", conversations)
    return (
        <div className="w-80 bg-white border border-gray-800 rounded-xl flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold mb-4">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search..." className="pl-9 h-9" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => (
                    <div
                        key={conv.id}
                        onClick={() => {
                            setActiveConvId(conv.conversationId)
                            setOtherUserInfo({
                                name: conv.otherUserName,
                                avatarUrl: conv.otherUserAvatarUrl,
                                id: conv.otherUserId
                            })
                        }}
                        className={cn(
                            "p-4 flex gap-3 cursor-pointer hover:bg-gray-50",
                            activeConvId === conv.conversationId && "bg-indigo-50"
                        )}
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden">
                            {conv?.otherUserAvatarUrl ? (
                                <img src={conv.otherUserAvatarUrl} className="w-full h-full object-cover" />
                            ) : (
                                conv.otherUserId?.charAt(0)
                            )}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="text-sm truncate w-[90%] font-semibold">
                                        {conv.otherUserName}
                                    </h3>

                                </div>

                                <div className='flex justify-between items-center'>
                                    <p className="text-xs text-gray-500 w-[70%] truncate">
                                        {conv.lastMessage?.text}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {conv.lastMessage?.created_at?.toDate?.().toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>

                            {conv.unreadCount > 0 && (
                                <div className="w-5 h-5 bg-indigo-600 text-white text-xs flex items-center justify-center rounded-full">
                                    {conv.unreadCount}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}