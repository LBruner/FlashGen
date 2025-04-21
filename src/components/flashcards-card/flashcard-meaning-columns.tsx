import React from "react";
import { Flashcard } from "@/models/Flashcard";
import { capitalizeFirstLetter, removeTags } from "@/lib/flashcard";

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

const FlashcardMeaningColumns: React.FC<FlashcardMeaningsColumnsProps> = ({
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
      className={` hover:bg-green-300 ${
        isSelected
          ? "border-blue-600 border-2 rounded bg-blue-500"
          : "bg-blue-400 border-2 border-transparent"
      }`}
      key={meaning.example}
    >
      <div
        className={
          "flex py-2 items-center border-b-gray-200 border-b justify-center shadow"
        }
      >
        <p className={"text-lg text-white font-light text-center"}>
          {removeTags(meaning.definition)}
        </p>
      </div>
      <div
        className={
          "flex items-center py-2 border-b-gray-200 border-b justify-center shadow"
        }
      >
        <p className={"text-2xl text-white font-bold text-center"}>
          {capitalizeFirstLetter(removeTags(meaning.translation))}
        </p>
      </div>
      <div
        className={
          "flex py-2 items-center border-b-gray-200 border-b justify-center shadow"
        }
      >
        <p className={"text-lg text-white font-light text-center"}>
          {removeTags(meaning.example)}
        </p>
      </div>
    </div>
  );
};

export default FlashcardMeaningColumns;
