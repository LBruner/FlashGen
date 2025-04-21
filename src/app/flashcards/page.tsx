"use client";

import React, {useState} from "react";
import {Tag} from "react-tag-input";
import {ChatMessage} from "@/models/ChatMessage";
import {getPrompt} from "../../../public/prompt";
import {Flashcard} from "@/models/Flashcard";
import TagInput from "@/components/UI/tag-input/TagInput";
import {Button} from "@heroui/react";
import FlashCardResults from "@/components/flashcard-results/flashcard-results";
import AnkiConnectionStatusCard from "@/components/anki-connection/anki-connection-status-card";

const CreateFlashcardsPage: React.FC = (_) => {
    const [wordTags, setWordTags] = useState<Array<Tag>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    console.log(flashcards);
    const sendMessage = async () => {
        if (wordTags.length === 0 || isLoading) return;

        const newMessage: ChatMessage = {
            role: "user",
            content: getPrompt(wordTags.map((item) => item.text), 'Spanish', 'Brazilian portuguese'),
        };
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    messages: [newMessage],
                }),
            });

            if (!response.body) {
                throw new Error("No response body");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const processStream = async () => {
                let rawBuffer = "";
                let jsonBuffer = "";
                const targetMarker = "###END_FLASHCARD###";
                let markerBuffer = "";
                let inJsonObject = false;
                let braceDepth = 0;

                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;

                    rawBuffer += decoder.decode(value);

                    const lines = rawBuffer.split("\n");
                    rawBuffer = lines.pop() || "";

                    for (const line of lines) {
                        if (line.trim() === "[DONE]") continue;

                        try {
                            let content = "";
                            if (line.startsWith("data:")) {
                                const parsed = JSON.parse(line.slice(5).trim());
                                content = parsed.choices?.[0]?.delta?.content || "";
                            } else {
                                content = line;
                            }

                            for (const char of content) {
                                if (char === "{") {
                                    if (!inJsonObject) {
                                        jsonBuffer = "";
                                        inJsonObject = true;
                                    }
                                    braceDepth++;
                                    jsonBuffer += char;
                                } else if (char === "}") {
                                    if (inJsonObject) {
                                        jsonBuffer += char;
                                        braceDepth--;
                                        if (braceDepth === 0) {
                                            inJsonObject = false;
                                        }
                                    }
                                } else if (inJsonObject) {
                                    jsonBuffer += char;
                                }

                                markerBuffer += char;
                                if (!targetMarker.startsWith(markerBuffer)) {
                                    markerBuffer = "";
                                }

                                if (markerBuffer === targetMarker) {
                                    try {
                                        const flashcard = JSON.parse(jsonBuffer);
                                        if (flashcard.word) {
                                            setFlashcards((prev) => [
                                                ...prev,
                                                new Flashcard({...flashcard, language: 'English'}),
                                            ]);
                                        }
                                        jsonBuffer = "";
                                        markerBuffer = "";
                                    } catch (e) {
                                        console.log("Error parsing flashcard:", jsonBuffer, e);
                                    }
                                }
                            }
                        } catch (e) {
                            console.log("Error processing line:", line, e);
                        }
                    }
                }

                if (jsonBuffer.trim()) {
                    try {
                        const flashcard = JSON.parse(jsonBuffer);
                        if (flashcard.word) {
                            setFlashcards((prev) => [...prev, flashcard]);
                        }
                    } catch (e) {
                        console.log("Error parsing final content:", jsonBuffer, e);
                    }
                }
            };

            await processStream();
        } catch (error) {
            console.log("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={"w-full flex flex-col items-center justify-center mt-12"}>
            <div className="w-11/12">
                <TagInput wordTags={wordTags} setWordTags={setWordTags}/>
                <Button
                    onPress={sendMessage}
                    className="w-full bg-blue-500 dark:bg-blue-800 dark:hover:bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send"}
                </Button>
                {isConnected && flashcards.length > 0 && (
                    <FlashCardResults
                        flashcards={flashcards}
                        setFlashcards={setFlashcards}
                    />
                )}

                <AnkiConnectionStatusCard
                    isConnected={isConnected}
                    setIsConnected={setIsConnected}
                />
            </div>
        </div>
    );
};

export default CreateFlashcardsPage;
