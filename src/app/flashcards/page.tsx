import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";
import {pegaTodosDecks} from "@/app/actions/anki";

const CreateFlashcardsPage: React.FC = async () => {
    const userDecks = await pegaTodosDecks();

    return (
        <div className={'w-full flex justify-center'}>
            <div className={'items-center w-full'}>
                <FlashcardBody userDecks={userDecks}/>
            </div>
        </div>
    );
}

export default CreateFlashcardsPage;
