import React from "react";
import {Flashcard} from "@/models/Flashcard";
import FlashcardCard from "@/components/flashcards-card/flashcard-card";

interface FlashcardCardListProps {
    flashcards: Flashcard[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

const FlashcardCardList: React.FC<FlashcardCardListProps> = ({flashcards, setFlashcards}) => {
    return (
        <div className={'flex justify-center items-start gap-4'}>
            {
                flashcards.map((flashcard,index) => (
                    <FlashcardCard key={flashcard.word} flashcard={flashcard} setFlashcards={setFlashcards} flashcardIndex={index}/>
                ))
            }
        </div>
    )
}

export default FlashcardCardList;