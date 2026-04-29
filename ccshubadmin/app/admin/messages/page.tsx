'use client'
import { useState } from "react";
import Conversation from "./Conversation";
import MessageBar from "./MessageBar";

type UserInfo = {
    name: string;
    avatarUrl: string
    id: string;
}

export default function Messages() {
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [otherUserInfo, setOtherUserInfo] = useState<UserInfo | null>(null);

    return (
        <div className="p-6 max-w-[1400px] mx-auto h-[calc(100vh-6.9rem)] flex gap-6 font-[inter]">
            <MessageBar 
                activeConvId={activeConvId}
                setActiveConvId={setActiveConvId}
                otherUserInfo={otherUserInfo}
                setOtherUserInfo={setOtherUserInfo}
            />

            <Conversation 
                activeConvId={activeConvId}
                otherUserInfo={otherUserInfo}
            />
        </div>
    );
}