import React from "react";
import {Flashcard} from "@/models/flashcard";
import {capitalizeFirstLetter, removeTags} from "@/lib/flashcard-formatter";
import {RxCheck} from "react-icons/rx";

interface FlashcardMeaningsColumnsProps {
    meaning: {
        definition: string;
        translation: string;
        example: string;
    };
    flashcardIndex: number;
    meaningIndex: number;
    isSelected: boolean;
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

const FlashcardMeaningColumns: React.FC<FlashcardMeaningsColumnsProps> = (
    {
        meaning,
        setFlashcards,
        flashcardIndex,
        meaningIndex,
        isSelected,
    }) => {
    const toggleMeaning = (flashcardIndex: number, meaningIndex: number) => {
        setFlashcards((prevFlashcards: Flashcard[]) => {
            console.log(prevFlashcards);
            return prevFlashcards.map((flashcard, index) => {
                if (index === flashcardIndex) {
                    return {
                        ...flashcard,
                        selectedMeaningIndex: flashcard.selectedMeaningIndex?.includes(
                            meaningIndex
                        )
                            ? flashcard.selectedMeaningIndex.filter(
                                (index) => index !== meaningIndex
                            )
                            : [...flashcard.selectedMeaningIndex!, meaningIndex],
                    };
                }
                return flashcard;
            });
        });
    };

    return (
        <div
            onClick={() => toggleMeaning(flashcardIndex, meaningIndex)}
            className={`p-4 flex flex-col gap-4 border-2 rounded-xl cursor-pointer transition-colors duration-200 ${
                isSelected
                    ? "border-indigo-500 dark:border-indigo-400 bg-blue-100 dark:bg-blue-900/30"
                    : "bg-blue-50 dark:bg-gray-600/50 border-transparent hover:bg-blue-100 dark:hover:bg-gray-600/70"
            }`}
            key={meaning.example}
        >
            <div>
                <div className={'flex justify-between'}>
                    <p className={'text-gray-600 dark:text-gray-300 font-medium'}>Definition</p>
                    {isSelected && <div className={'flex justify-center items-center p-1 rounded-3xl bg-indigo-600 dark:bg-indigo-500'}>
                        <RxCheck size={16} className="text-white"/>
                    </div>
                    }
                </div>
                <p className={"text-gray-800 dark:text-gray-100 font-semibold"}>
                    {removeTags(meaning.definition)}
                </p>
            </div>
            <div>
                <p className={'text-gray-600 dark:text-gray-300 font-medium'}>Translation</p>
                <p className={"text-teal-500 dark:text-teal-400 font-serif"}>
                    {capitalizeFirstLetter(removeTags(meaning.translation))}
                </p>
            </div>
            <div className={'px-2 py-1 bg-slate-50 dark:bg-slate-700 rounded-lg'}>
                <p className={"text-gray-600 dark:text-gray-300 font-semibold"}>
                    {removeTags(meaning.example)}
                </p>
            </div>
        </div>
    );
};

export default FlashcardMeaningColumns;