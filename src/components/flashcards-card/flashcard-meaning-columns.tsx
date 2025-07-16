import React from "react";
import {Flashcard} from "@/models/Flashcard";
import {capitalizeFirstLetter, removeTags} from "@/lib/FlashcardFormatter";
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
            className={`p-4 flex flex-col gap-4 border-2 rounded-xl ${
                isSelected
                    ? "border-indigo-500 bg-blue-100"
                    : "bg-blue-50 border-transparent"
            }`}
            key={meaning.example}
        >
            <div>
                <div className={'flex justify-between'}>
                    <p className={'text-gray-600 font-medium'}>Definition</p>
                    {isSelected && <div className={'flex justify-center items-center p-1 rounded-3xl bg-indigo-600'}>
                        <RxCheck size={16}/>
                    </div>
                    }
                </div>
                <p className={"text-gray-800 font-semibold"}>
                    {removeTags(meaning.definition)}
                </p>
            </div>
            <div>
                <p className={'text-gray-600 font-medium'}>Translation</p>
                <p className={"text-teal-500 font-serif"}>
                    {capitalizeFirstLetter(removeTags(meaning.translation))}
                </p>
            </div>
            <div className={'px-2 py-1 bg-slate-50 rounded-lg'}>
                <p className={"text-gray-600 font-semibold"}>
                    {removeTags(meaning.example)}
                </p>
            </div>
        </div>
    );
};

export default FlashcardMeaningColumns;
