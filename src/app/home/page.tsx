import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";

export const metadata = {
    title: "Create Flashcards | FlashGen",
};

const CreateFlashcardsPage: React.FC = async () => {
    return (
        <div>
            <FlashcardBody/>
        </div>
    );
}

export default CreateFlashcardsPage;
