import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";
import {pegaTodosDecks} from "@/app/actions/anki";

const CreateFlashcardsPage: React.FC = async (_) => {
    const userDecks = await pegaTodosDecks();

    return (
        <FlashcardBody userDecks={userDecks}/>
    );
}

export default CreateFlashcardsPage;
