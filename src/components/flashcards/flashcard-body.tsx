'use client';

import React, {useEffect, useState} from "react";
import {Flashcard} from "@/models/flashcard";
import {ChatMessage} from "@/models/chat-message";
import {getPrompt} from "../../../public/prompt";
import {AnkiDeck} from "@/models/anki/deck";
import {flashcardLanguages} from "@/lib/languages-list";
import {AxiosResponse} from "axios";
import AddWordsForm from "@/components/pages/add-flashcards-form";
import {useDisclosure} from "@heroui/react";
import axiosApi from "@/lib/axios-api";
import {AddCardFeedbackResponseData, ApiResponse} from "@/models/api-response";
import {ankiPaths} from "@/path-routes";
import FlashcardsCreation from "@/components/FlashcardsCreation/flashcards-creation";
import FlashcardsResults from "@/components/flashcards/flashcards-results";
import CustomSpinner from "@/components/UI/custom-spinner";
import {pegaTodosDecks} from "@/app/actions/anki";
import CustomNotificationContainer from "@/components/UI/toast/custom-notification-container";
import {toast} from "react-toastify";
import {useTheme} from "next-themes";
import {getSelectedMeaningsFlashcards} from "@/lib/anki";
import {AnkiExporter} from "@/models/anki-exporter";
import {useAppSettings} from "@/store/context/settings-context-provider";

const FlashcardBody: React.FC = () => {
    const [wordTags, setWordTags] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userDecks, setUserDecks] = useState<Array<AnkiDeck>>([]);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isAnkiConnected} = useAppSettings();

    useEffect(() => {
        fetchUserDecks().then();
    }, [isAnkiConnected]);

    const fetchUserDecks = async (): Promise<void> => {
        const userDecks = await pegaTodosDecks();
        const newUserDecks = ['Import cards (.csv file)', ...userDecks];
        setUserDecks(newUserDecks);
        setSelectedDeck(newUserDecks[0]);
    }

    const [flashcards, setFlashcards] = useState<Flashcard[]>([
        // new Flashcard({
        //     "word": "<span style=\"color: rgb(231, 217, 15);\">live</span>",
        //     "phonetic": "(/lɪv/)",
        //     "meanings": [
        //         {
        //             "definition": "to be alive; have life",
        //             "translation": "viver",
        //             "example": "She wants to <span style=\"color: rgb(231, 217, 15);\">live</span> a long and happy life."
        //         },
        //         {
        //             "definition": "to reside in a particular place",
        //             "translation": "morar",
        //             "example": "They <span style=\"color: rgb(231, 217, 15);\">live</span> in a small apartment downtown."
        //         }
        //     ]
        // }),
        // new Flashcard({
        //     "word": "<span style=\"color: rgb(231, 217, 15);\">dance</span>",
        //     "phonetic": "(/dæns/)",
        //     "meanings": [
        //         {
        //             "definition": "to move rhythmically to music",
        //             "translation": "dançar",
        //             "example": "He loves to <span style=\"color: rgb(231, 217, 15);\">dance</span> at parties."
        //         },
        //         {
        //             "definition": "a series of movements performed to music",
        //             "translation": "dança",
        //             "example": "The ballet <span style=\"color: rgb(231, 217, 15);\">dance</span> was beautiful and graceful."
        //         }
        //     ]
        // })
    ]);

    const [selectedDeck, setSelectedDeck] = useState<AnkiDeck>(userDecks[0]);
    const [currentScreen, setCurrentScreen] = useState(0);

    const [inputLanguage, setInputLanguage] = useState<string>(flashcardLanguages[0].code);
    const [outputLanguage, setOutputLanguage] = useState<string>(flashcardLanguages[1].code);

    const [addFlashcardsFeedback, setAddFlashcardsFeedback] = useState<AddCardFeedbackResponseData | null>();
    const {theme} = useTheme();

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

            const flashcardArray: Array<Flashcard> = flashcards.flashcards.map((flashcard: Flashcard) => new Flashcard({
                ...flashcard, inputLanguage, outputLanguage,
                selectedMeaningIndex: [0],
            }));

            setFlashcards(flashcardArray);
            setIsLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    const onStartFlashcardCreation = async () => {
        setCurrentScreen(1);
        await sendMessage();
    }

    const addFlashcardsToAnki = async () => {
        setIsLoading(true);
        const selectedMeaningsFlashcards = getSelectedMeaningsFlashcards(flashcards);

        const {data}: ApiResponse<AddCardFeedbackResponseData> = (await axiosApi.post(ankiPaths.getFlashcardsEndpoint(), {
            cards: selectedMeaningsFlashcards,
            selectedDeckName: selectedDeck
        })).data;

        setAddFlashcardsFeedback(data);
        setCurrentScreen(2);
        setIsLoading(false);
    };

    const importFlashcardsToFile = async () => {
        if (flashcards.length === 0) {
            return;
        }

        const selectedMeaningsFlashcards = getSelectedMeaningsFlashcards(flashcards);
        AnkiExporter.exportToAnkiTSV(selectedMeaningsFlashcards);
        setAddFlashcardsFeedback({
            addedCards: flashcards.length,
            executionTime: 0,
            deckName: 'Exported through file'
        });
        setCurrentScreen(2);
    };

    const resetPageData = () => {
        onClose();
        setFlashcards([]);
        setSelectedDeck('');
        setWordTags([]);
        setCurrentScreen(0);
        setIsLoading(false);
    }

    const createDeck = async (deckName: string) => {
        if (userDecks.includes(deckName)) {
            setSelectedDeck(deckName);

            toast(CustomNotificationContainer, {
                data: {
                    title: 'Alert',
                    content: `Deck: ${deckName} already exists. We have selected it for you`,
                },
                autoClose: 2000,
                closeButton: false,
                type: 'info',
                theme,
            });
            return;
        }
        try {
            const {data} = await axiosApi.post(ankiPaths.getDecksEndpoint(), {
                deckName,
            });

            const wasSuccessful = data!.success;

            toast(CustomNotificationContainer, {
                data: {
                    title: 'Success',
                    content: `Deck: ${deckName} successfully created`,
                },
                autoClose: 2000,
                closeButton: false,
                type: wasSuccessful ? 'success' : 'error',
                theme,
            });

            if (wasSuccessful) {
                setUserDecks(prevState => [deckName, ...prevState]);
                setSelectedDeck(deckName);
            }
        } catch
            (e) {
            console.log(e);
        }
    };

    if (isLoading) {
        return <CustomSpinner/>
    }

    return (
        <div className={'flex w-full justify-center items-center'}>
            {currentScreen == 0 &&
                <AddWordsForm
                    tags={wordTags} setTags={setWordTags} userDecks={userDecks} selectedDeck={selectedDeck}
                    setSelectedDeck={setSelectedDeck} setInputLanguage={setInputLanguage}
                    inputLanguage={inputLanguage}
                    outputLanguage={outputLanguage} setOutputLanguage={setOutputLanguage} isLoading={isLoading}
                    handleCreateFlashcards={onStartFlashcardCreation} isOpen={isOpen} onClose={onClose}
                    onOpen={onOpen} createDeck={createDeck}
                />
            }
            {currentScreen == 1 &&
                <FlashcardsCreation
                    addFlashcardsToAnki={addFlashcardsToAnki}
                    flashcards={flashcards}
                    setFlashcards={setFlashcards}
                    selectedDeck={selectedDeck}
                    importFlashcardsToFile={importFlashcardsToFile}
                />
            }
            {currentScreen == 2 &&
                <FlashcardsResults resetPageData={resetPageData} responseData={addFlashcardsFeedback!}/>}
        </div>
    )
};

export default FlashcardBody;