import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";
import {pegaTodosDecks} from "@/app/actions/anki";

const CreateFlashcardsPage: React.FC = async (_) => {
    const userDecks = await pegaTodosDecks();

    return (
        <div className={'w-full flex justify-center'}>
            <div className={'items-center w-full py-8 mx-12'}>
                <FlashcardBody userDecks={userDecks}/>
            </div>
        </div>
    );
}

export default CreateFlashcardsPage;
