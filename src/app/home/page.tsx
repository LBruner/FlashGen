import React from "react";
import FlashcardBody from "@/components/flashcards/flashcard-body";
import Head from "next/head";

export const metadata = {
    title: "Create Flashcards | FlashGen",
};

const CreateFlashcardsPage: React.FC = async () => {
    return (
        <div>
            <Head>
                <title>My page title</title>
            </Head>
            <FlashcardBody/>
        </div>
    );
}

export default CreateFlashcardsPage;
