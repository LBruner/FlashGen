'use client';

import React, {useState} from "react";
import {Flashcard} from "@/models/Flashcard";
import {ChatMessage} from "@/models/ChatMessage";
import {getPrompt} from "../../../public/prompt";
import FlashCardResults from "@/components/flashcard-results/flashcard-results";
import {AnkiDeck} from "@/models/anki/deck";
import {flashcardLanguages} from "@/lib/languages-list";
import {AxiosResponse} from "axios";
import AddFlashcardsForm from "@/components/pages/AddFlashcardsForm";
import {useDisclosure} from "@heroui/react";
import axiosApi from "@/lib/AxiosApi";
import {ApiResponse} from "@/models/ApiResponse";

interface FlashcardBodyProps {
    userDecks: AnkiDeck[];
}


const FlashcardBody: React.FC<FlashcardBodyProps> = ({userDecks}) => {
    const [wordTags, setWordTags] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const [selectedDeck, setselectedDeck] = useState<AnkiDeck>(userDecks[0]);
    const [currentScreen, setCurrentScreen] = useState(0);

    const [inputLanguage, setInputLanguage] = useState<string>(flashcardLanguages[0].code);
    const [outputLanguage, setOutputLanguage] = useState<string>(flashcardLanguages[1].code);


    const sendMessage = async () => {
        if (wordTags.length === 0 || isLoading) return;

        const newMessage: ChatMessage = {
            role: "user",
            content: getPrompt(wordTags.map((item) => item), inputLanguage, outputLanguage),
        };
        setIsLoading(true);

        try {
            const response: AxiosResponse<ApiResponse<Array<string>>> = await axiosApi.post("/api/chat", {
                messages: [newMessage],
            });

            const flashcards = JSON.parse(response.data.data[0]);
            console.log(flashcards.flashcards);
            const flashcardArray: Array<Flashcard> = flashcards.flashcards.map((flashcard: any) => new Flashcard({
                ...flashcard, inputLanguage, outputLanguage,
                selectedMeaningIndex: [0],
            }));

            setFlashcards(flashcardArray);
        } catch (e) {
            console.log(e)
        }
    }

    const onStartFlashcardCreation = async () => {
        setCurrentScreen(1);
        await sendMessage();
    }

    return (
        <div className={'flex w-full h-auto justify-center items-center'}>
            {currentScreen == 0 &&
                <AddFlashcardsForm
                    isAnkiConnected={true}
                    tags={wordTags} setTags={setWordTags} userDecks={userDecks} selectedDeck={selectedDeck}
                    setSelectedDeck={setselectedDeck} setInputLanguage={setInputLanguage}
                    inputLanguage={inputLanguage}
                    outputLanguage={outputLanguage} setOutputLanguage={setOutputLanguage} isLoading={isLoading}
                    handleCreateFlashcards={onStartFlashcardCreation} isOpen={isOpen} onClose={onClose}
                    onOpen={onOpen}
                />
            }
            {currentScreen == 1 &&
                <FlashCardResults
                    flashcards={flashcards}
                    setFlashcards={setFlashcards}
                    inputLanguage={inputLanguage}
                    outputLanguage={outputLanguage}
                    selectedDeckName={selectedDeck}
                />
            }
        </div>
    )
};

export default FlashcardBody;