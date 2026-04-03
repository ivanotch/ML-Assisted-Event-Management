'use client'
import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Image as ImageIcon, Paperclip, MessageCircle } from 'lucide-react';
import { mockConversations, mockMessages } from '@/mock/mockEvent';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Messages() {
    const [activeConvId, setActiveConvId] = useState(mockConversations[0].id);
    const activeConv = mockConversations.find(c => c.id === activeConvId);
    const [msgInput, setMsgInput] = useState('');

    return (
        <div className="p-6 max-w-[1400px] mx-auto h-[calc(100vh-4rem)] flex gap-6">
            {/* Sidebar List */}
            <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search messages..." className="pl-9 bg-gray-50 border-transparent h-9" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {mockConversations.map(conv => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConvId(conv.id)}
                            className={cn(
                                "p-4 border-b border-gray-50 flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-50",
                                activeConvId === conv.id ? "bg-indigo-50/50 hover:bg-indigo-50/50" : ""
                            )}
                        >
                            <div className="relative flex-shrink-0">
                                {conv.avatar ? (
                                    <img src={conv.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                        {conv.name.charAt(0)}
                                    </div>
                                )}
                                {conv.isGroup && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[10px]">
                                        👥
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">{conv.name}</h3>
                                    <span className="text-xs text-gray-500">{conv.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-1">
                                    {conv.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col min-w-0">
                {activeConv ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-gray-100 px-6 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                {activeConv.avatar ? (
                                    <img src={activeConv.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                        {activeConv.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h2 className="font-semibold text-gray-900">{activeConv.name}</h2>
                                    <p className="text-xs text-green-600 font-medium">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <button className="p-2 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"><Phone className="h-5 w-5" /></button>
                                <button className="p-2 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"><Video className="h-5 w-5" /></button>
                                <button className="p-2 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"><MoreVertical className="h-5 w-5" /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 space-y-6">
                            {mockMessages.map((msg, i) => {
                                const isMe = msg.senderId === 'admin';
                                return (
                                    <div key={msg.id} className={cn("flex gap-3 max-w-[80%]", isMe ? "ml-auto flex-row-reverse" : "")}>
                                        {!isMe && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-auto"></div>
                                        )}
                                        <div className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                                            <div className={cn(
                                                "px-4 py-2 rounded-2xl text-sm",
                                                isMe
                                                    ? "bg-indigo-600 text-white rounded-br-sm"
                                                    : "bg-white border border-gray-100 text-gray-900 rounded-bl-sm shadow-sm"
                                            )}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[11px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <Paperclip className="h-5 w-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <ImageIcon className="h-5 w-5" />
                                </button>
                                <Input
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-50 border-transparent rounded-full px-4 h-10"
                                    value={msgInput}
                                    onChange={(e) => setMsgInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && msgInput.trim()) {
                                            setMsgInput('');
                                            // In a real app we'd dispatch this
                                        }
                                    }}
                                />
                                <Button className="rounded-full w-10 h-10 p-0 flex items-center justify-center flex-shrink-0" onClick={() => setMsgInput('')}>
                                    <Send className="h-4 w-4 -ml-0.5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MessageCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
