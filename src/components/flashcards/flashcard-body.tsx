'use client';

import React, {useEffect, useState} from "react";
import {Flashcard} from "@/models/flashcard";
import {ChatMessage} from "@/models/chat-message";
import {getPrompt} from "../../../public/prompt";
import {AnkiDeck} from "@/models/anki/deck";
import {flashcardLanguages} from "@/lib/languages-list";
import {AxiosResponse} from "axios";
import AddFlashcardsForm from "@/components/pages/add-flashcards-form";
import {useDisclosure} from "@heroui/react";
import axiosApi from "@/lib/axios-api";
import {AddCardFeedbackResponseData, ApiResponse} from "@/models/api-response";
import {ankiPaths} from "@/path-routes";
import FlashcardsResults from "@/components/flashcards/flashcards-results";
import CustomSpinner from "@/components/UI/custom-spinner";
import {pegaTodosDecks} from "@/app/actions/anki";
import CustomNotificationContainer from "@/components/UI/toast/custom-notification-container";
import {toast} from "react-toastify";
import {useTheme} from "next-themes";
import {getSelectedMeaningsFlashcards} from "@/lib/anki";
import {AnkiExporter} from "@/models/anki-exporter";
import {useAppSettings} from "@/store/context/settings-context-provider";
import FlashcardsReview from "@/components/flashcards-review/flashcards-review";
import FlashcardSteps from "@/components/UI/flashcard-steps";
import ScreenHeaderSwitcher from "@/components/UI/dashboard/dashboard-header-switcher";

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

    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    console.log(flashcards)
    const [selectedDeck, setSelectedDeck] = useState<AnkiDeck>(userDecks[0]);
    const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

    const [inputLanguage, setInputLanguage] = useState<string>(flashcardLanguages[0].code);
    const [outputLanguage, setOutputLanguage] = useState<string>(flashcardLanguages[1].code);

    const [addFlashcardsFeedback, setAddFlashcardsFeedback] = useState<AddCardFeedbackResponseData | null>();
    const {theme} = useTheme();

    const sendMessage = async () => {
        if (wordTags.length === 0 || isLoading) return;

        const newWords = wordTags.filter((word) => {
            const wordExists = flashcards.some((card) => {
                const cleanCardWord = card.word.replace(/<[^>]*>/g, '').toLowerCase();
                return cleanCardWord === word.toLowerCase();
            });

            return !wordExists;
        });

        if (newWords.length === 0) {
            console.log('All words already exist in flashcards');
            return;
        }

        const newMessage: ChatMessage = {
            role: "user",
            content: getPrompt(newWords, inputLanguage, outputLanguage),
        };

        setIsLoading(true);

        try {
            const response: AxiosResponse<ApiResponse<Array<string>>> = await axiosApi.post("/api/chat", {
                messages: [newMessage],
            });

            const responseFlashcards = JSON.parse(response.data.data[0]);

            const flashcardArray: Array<Flashcard> = responseFlashcards.flashcards.map((flashcard: Flashcard) => new Flashcard({
                ...flashcard,
                inputLanguage,
                outputLanguage,
                selectedMeaningIndex: [0],
            }));

            setFlashcards(prevFlashcards => [...prevFlashcards, ...flashcardArray]);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    const onStartFlashcardCreation = async () => {
        setCurrentScreenIndex(1);
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
        setCurrentScreenIndex(2);
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
        setCurrentScreenIndex(2);
    };

    const resetPageData = () => {
        onClose();
        setFlashcards([]);
        setWordTags([]);
        setCurrentScreenIndex(0);
        setIsLoading(false);
        setAddFlashcardsFeedback(null);
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
        <div className={'flex h-screen pt-8 px-12 flex-col w-full items-center'}>
            <ScreenHeaderSwitcher currentScreenIndex={currentScreenIndex}/>
            <FlashcardSteps
                showFlashcardReviewPage={flashcards.length > 0}
                showFeedbackPage={addFlashcardsFeedback != null}
                currentScreenIndex={currentScreenIndex}
                setCurrentScreen={setCurrentScreenIndex}
            />
            {currentScreenIndex == 0 &&
                <AddFlashcardsForm
                    tags={wordTags} setTags={setWordTags} userDecks={userDecks} selectedDeck={selectedDeck}
                    setSelectedDeck={setSelectedDeck} setInputLanguage={setInputLanguage}
                    inputLanguage={inputLanguage}
                    outputLanguage={outputLanguage} setOutputLanguage={setOutputLanguage} isLoading={isLoading}
                    handleCreateFlashcards={onStartFlashcardCreation} isOpen={isOpen} onClose={onClose}
                    onOpen={onOpen} createDeck={createDeck}
                />
            }
            {currentScreenIndex == 1 &&
                <FlashcardsReview
                    addFlashcardsToAnki={addFlashcardsToAnki}
                    flashcards={flashcards}
                    setFlashcards={setFlashcards}
                    selectedDeck={selectedDeck}
                    setSelectedDeck={setSelectedDeck}
                    importFlashcardsToFile={importFlashcardsToFile}
                    userDecks={userDecks}
                />
            }
            {currentScreenIndex == 2 &&
                <FlashcardsResults resetPageData={resetPageData} responseData={addFlashcardsFeedback!}/>}
        </div>
    )
};

export default FlashcardBody;