import {Button} from "@heroui/react";
import FlashcardCardList from "../flashcards-card/flashcards-cards-list";
import {Flashcard} from "@/models/Flashcard";
import React from "react";

interface FlashCardResultsProps {
    flashcards: Flashcard[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
    inputLanguage: string,
    outputLanguage: string,
    selectedDeckName: string,
}

const FlashCardResults: React.FC<FlashCardResultsProps> = (
    {
        flashcards,
        setFlashcards,
        selectedDeckName
    }) => {
    const onCreateFlashcards = async () => {
        const flattenFlashcards: Flashcard[] = flashcards.flatMap((flashcard) => {
            const selectedMeanings = flashcard.selectedMeaningIndex.map(
                (index) => flashcard.meanings[index]
            );
            return selectedMeanings.map((meaning) => {
                return new Flashcard({
                    word: flashcard.word,
                    phonetic: flashcard.phonetic,
                    meanings: [meaning],
                    selectedMeaningIndex: [0],
                    inputLanguage: flashcard.inputLanguage,
                    outputLanguage: flashcard.outputLanguage,
                });
            });
        });
        console.log('FLAT')
        console.log(flattenFlashcards)

        await fetch("/api/anki/add-flashcards", {
            method: "POST",
            body: JSON.stringify({
                cards: flattenFlashcards,
                selectedDeckName
            }),
        });
    };

    console.log(flashcards);

    const hasNoCardsToAdd = flashcards.every((card) => card.selectedMeaningIndex.length == 0);
    return (
        <div className={'w-full flex flex-col items-center justify-center gap-4'}>
            <FlashcardCardList
                flashcards={flashcards}
                setFlashcards={setFlashcards}
            />
            <Button disabled={hasNoCardsToAdd} onPress={onCreateFlashcards} color="primary">
                Add Cards
            </Button>
        </div>
    );
};

export default FlashCardResults;
