import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";
import {appName} from "@/constants";

export const metadata = {
    title: `Create Flashcards | ${appName}`,
};

const CreateFlashcardsPage: React.FC = async () => {
    return (
        <div>
            <FlashcardBody/>
        </div>
    );
}

export default CreateFlashcardsPage;
