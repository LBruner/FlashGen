'use client';

import React, {useState} from "react";
import {Button} from "@heroui/react";
import {Textarea} from "@heroui/input";
import {ChatResponse} from "@/models/ChatResponse";
import {ChatMessage} from "@/models/ChatMessage";


const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const newMessage: ChatMessage = {role: "user", content: input};
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    messages: [...messages, newMessage]
                }),
            });

            const data: ChatResponse = await response.json();

            if (data.choices && data.choices.length > 0) {
                const assistantMessage: ChatMessage = data.choices[0].message;
                setMessages(prevMessages => [...prevMessages, assistantMessage]);
            } else {
                console.error("Unexpected response format:", data);
                alert("Received an invalid response from the server");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage().then();
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 dark:bg-customDarkBg flex items-center justify-center p-4">
            <div className="w-3/4 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Chat</h2>
                <div className="mb-4 overflow-y-auto h-64 bg-gray-50 dark:bg-customDarkNav p-4 rounded-lg">
                    <div className={'flex flex-col gap-1'}>
                        {messages.map((message, index) => (
                            <div key={index}
                                 className={`p-3 my-1 rounded-lg ${message.role === 'user' ? 'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white'}`}>
                                {message.content.replace(/<think>.*?<\/think>/s, '').trim()}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <Textarea
                        label={'Message'}
                        labelPlacement={'outside'}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full dark:bg-customDarkNav p-4"
                        placeholder="Type a message..."
                    />
                    <Button
                        onPress={sendMessage}
                        className="w-full bg-blue-500 dark:bg-blue-800 dark:hover:bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Chat;