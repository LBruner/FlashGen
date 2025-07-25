import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";

const CreateFlashcardsPage: React.FC = async () => {
    return (
        <div className={'w-full flex justify-center'}>
            <div className={'items-center w-full'}>
                <FlashcardBody/>
            </div>
        </div>
    );
}

export default CreateFlashcardsPage;
