import React from "react";
import {Flashcard} from "@/models/flashcard";
import FlashcardCard from "@/components/flashcards-card/flashcard-card";

interface FlashcardCardListProps {
    flashcards: Flashcard[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

const FlashcardCardList: React.FC<FlashcardCardListProps> = ({flashcards, setFlashcards}) => {
    return (
        <div className={'grid grid-cols-2 gap-4 w-full'}>
            {
                flashcards.map((flashcard,index) => (
                    <FlashcardCard key={index} flashcard={flashcard} setFlashcards={setFlashcards} flashcardIndex={index}/>
                ))
            }
        </div>
    )
}

export default FlashcardCardList;