'use client'
import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function Conversation({ activeConvId, otherUserInfo }: any) {
    const [messages, setMessages] = useState<any[]>([]);
    const [msgInput, setMsgInput] = useState('');
    console.log("other info", otherUserInfo)

    useEffect(() => {
        if (!activeConvId) return;

        const q = query(
            collection(db, "conversations", activeConvId, "messages"),
            orderBy("created_at", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setMessages(data);
        });

        return () => unsubscribe();
    }, [activeConvId]);

    if (!activeConvId) {
        return <div className="flex-1 flex items-center justify-center">Select a chat</div>;
    }

    return (
        <div className="flex-1 flex flex-col bg-white border border-black rounded-xl">
            <div className='py-3 px-5 border-b-1 border-gray-500 w-full flex gap-3 items-center'>
                <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden">
                    {otherUserInfo.avatarUrl ? (
                        <img src={otherUserInfo.avatarUrl} className="w-full h-full object-cover" />
                    ) : (
                        otherUserInfo.otherUserId?.charAt(0)
                    )}
                </div>
                <span>{otherUserInfo.name}</span>
            </div>
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">

                {messages.map(msg => {
                    const isMe = msg.senderId === auth.currentUser?.uid;

                    return (
                        <div
                            key={msg.id}
                            className={cn("flex", isMe ? "justify-end" : "justify-start")}
                        >
                            <div className={cn("flex flex-col", isMe ? "items-end" : "items-right")}>
                                <div
                                    className={cn(
                                        "px-4 py-2 rounded-2xl text-sm",
                                        isMe
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100"
                                    )}
                                >
                                    {msg.text}
                                </div>
                                <span className={cn("text-sm text-gray-500", isMe ? "pr-2" : "pl-2")}>{msg.created_at?.toDate()?.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
                <Input
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button>
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}