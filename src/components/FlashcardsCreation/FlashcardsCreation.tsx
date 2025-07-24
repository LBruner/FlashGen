import FlashcardCardList from "../flashcards-card/flashcards-cards-list";
import {Flashcard} from "@/models/Flashcard";
import React from "react";

interface FlashCardResultsProps {
    flashcards: Flashcard[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
    addFlashcardsToAnki: () => void;
}

const FlashcardsCreation: React.FC<FlashCardResultsProps> = (
    {
        flashcards,
        setFlashcards,
        addFlashcardsToAnki
    }) => {

    const hasNoCardsToAdd = flashcards.every((card) => card.selectedMeaningIndex.length == 0);

    const flashcardsReady = flashcards.reduce((acc, flashcard) => acc + flashcard.selectedMeaningIndex.length, 0);

    const selectAllMeanings = () => {
        const newFlashcards = [...flashcards];
        newFlashcards.forEach((card) => {
            card.selectedMeaningIndex = card.meanings.map((_, i) => i);
            return card;
        });

        setFlashcards(newFlashcards);
    }

    return (
        <div className={'w-full h-screen flex flex-col items-center justify-center gap-8 py-8 px-12'}>
            <div className={'flex justify-center flex-col items-center'}>
                <p className={'text-3xl font-bold'}>🎯 Review Your Flashcards</p>
                <p className={'text-lg light:text-gray-500 dark:text-gray-200'}>Select meanings and edit content before creating your cards</p>
            </div>
            <div className={'w-10/12 flex flex-col gap-8'}>
                <div
                    className={'flex flex-col items-center justify-center rounded-lg py-4 gap-4 dark:bg-slate-50/5 bg-gray-100 border dark:border-transparent'}>
                    <p className={'font-semibold text-xl'}>{flashcardsReady} flashcards ready</p>
                    <div className={'flex gap-4'}>
                        <button className={'px-4 border-gray-500 dark:border-transparent py-2 bg-slate-50/10 border rounded-lg font-semibold text-lg'}
                                onClick={selectAllMeanings}>
                            📋 Select All
                        </button>
                        <button disabled={hasNoCardsToAdd}
                            className={'px-4 py-2 bg-gradient-to-r from-green-400 to-green-700 border dark:border-green-900 dark:from-lime-400 dark:to-green-800 rounded-lg font-semibold text-lg dark:text-white text-gray-100 border-green-600 disabled:hover:cursor-not-allowed'}
                            onClick={addFlashcardsToAnki}>
                            🚀 Create Cards
                        </button>
                    </div>
                </div>

                <FlashcardCardList
                    flashcards={flashcards}
                    setFlashcards={setFlashcards}
                />
            </div>
        </div>
    );
};

export default FlashcardsCreation;
