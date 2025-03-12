'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button"

type Message = {
    role: "user" | "assistant" | "system";
    content: string;
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    console.log(messages)
    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const newMessage: Message = { role: "user", content: input };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, newMessage]
                }),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const assistantMessage: Message = data.choices[0].message;
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
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Chat</h2>
                <div className="mb-4 overflow-y-auto h-64 bg-gray-50 p-4 rounded-lg">
                    {messages.map((message, index) => (
                        <div key={index} className={`p-3 my-1 rounded-lg ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                            {message.content}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-blue-500"
                    placeholder="Type a message..."
                />
                <button onClick={(_) => setMessages([])}>Reset</button>
                <button
                    onClick={sendMessage}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Powered by DeepSeek</p>
                </div>
                <Button className={'text-red-900'}>Click me</Button>

            </div>
        </div>
    );
}