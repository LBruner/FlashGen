import React from "react";
import {Flashcard} from "@/models/Flashcard";
import FlashcardMeaningColumns from "@/components/flashcards-card/flashcard-meaning-columns";
import {removeTags} from "@/lib/FlashcardFormatter";

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
        <div className={"w-full transition-transform duration-300 hover:-translate-y-1 h-[51rem] flex-wrap rounded-lg bg-customCardBgLight shadow-lg px-6"}>
            <div
                className={"w-full py-4 dark:bg-gray-200 rounded-2xl flex justify-between items-start"}>
                <div className={"flex flex-col gap-2"}>
                    <p className={"text-3xl text-gray-950 text-center font-bold"}>
                        {removeTags(flashcard.word)}
                    </p>
                    <p className={"font-mono text-indigo-500"}>
                        {flashcard.phonetic}
                    </p>
                </div>
                <div>
                    <div className={'bg-teal-100 p-1 rounded-lg'}>
                        ✏️
                    </div>
                </div>
            </div>
            <div className={"flex flex-col bg-gray-200 gap-4"}>
                {flashcard.meanings.map((meaning, index) => (
                    <>
                        {index == 0 &&
                            <div className={'flex justify-between items-center'}>
                                <p className={'text-gray-800 font-semibold text-lg'}>Meanings</p>
                                <div className={'p-1 bg-gray-100 rounded-lg'}>
                                    <p className={'text-gray-500 font-medium text-sm'}>{flashcard.selectedMeaningIndex.length}/{flashcard.meanings.length} selected</p>
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
                    </>
                ))}
            </div>
        </div>
    );
};

export default FlashcardCard;
