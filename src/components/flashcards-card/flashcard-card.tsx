import React from "react";
import {Flashcard} from "@/models/flashcard";
import FlashcardMeaningColumns from "@/components/flashcards-card/flashcard-meaning-columns";
import {removeTags} from "@/lib/flashcard-formatter";

interface FlashcardCardCardProps {
    flashcard: Flashcard;
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
    flashcardIndex: number;
}

const FlashcardCard: React.FC<FlashcardCardCardProps> = (
    {
        flashcard,
        setFlashcards,
        flashcardIndex,
    }) => {
    return (
        <div className={"w-full transition-transform duration-300 hover:-translate-y-1 h-full py-4 flex-wrap rounded-lg bg-customCardBgLight dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 px-6"}>
            <div
                className={"w-full light:bg-gray-200 mb-4 rounded-2xl flex justify-between items-start"}>
                <div className={"flex items-center gap-2"}>
                    <p className={"text-3xl text-gray-950 dark:text-gray-50 text-center font-bold"}>
                        {removeTags(flashcard.word)}
                    </p>
                    <p className={"font-mono text-indigo-500 dark:text-indigo-400"}>
                        {flashcard.phonetic}
                    </p>
                </div>
                <div>
                    <div className={'bg-teal-100 dark:bg-teal-800 p-1 rounded-lg'}>
                        ✏️
                    </div>
                </div>
            </div>
            <div className={"flex flex-col light:bg-gray-200 gap-4"}>
                {flashcard.meanings.map((meaning, index) => (
                    <div key={index}>
                        {index == 0 &&
                            <div className={'flex justify-between items-center mb-4'}>
                                <p className={'text-gray-800 dark:text-gray-200 font-semibold text-lg'}>Meanings</p>
                                <div className={'p-1 bg-gray-100 dark:bg-gray-600 rounded-lg'}>
                                    <p className={'text-gray-500 dark:text-gray-300 font-medium text-sm'}>{flashcard.selectedMeaningIndex.length}/{flashcard.meanings.length} selected</p>
                                </div>
                            </div>
                        }
                        <FlashcardMeaningColumns
                            key={meaning.definition}
                            meaning={meaning}
                            setFlashcards={setFlashcards}
                            flashcardIndex={flashcardIndex}
                            meaningIndex={index}
                            isSelected={
                                flashcard.selectedMeaningIndex?.includes(index) ?? false
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashcardCard;