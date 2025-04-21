import React from "react";
import { Flashcard } from "@/models/Flashcard";
import FlashcardMeaningColumns from "@/components/flashcards-card/flashcard-meaning-columns";
import { capitalizeFirstLetter, removeTags } from "@/lib/flashcard";

interface FlashcardCardCardProps {
  flashcard: Flashcard;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  flashcardIndex: number;
}

const FlashcardCard: React.FC<FlashcardCardCardProps> = ({
  flashcard,
  setFlashcards,
  flashcardIndex,
}) => {
  return (
    <div
      className={
        "w-[30%] flex-wrap rounded-lg bg-customCardBgLight border shadow-lg"
      }
    >
      <div className={"w-full py-4"}>
        <div className={"flex justify-center items-center gap-2"}>
          <p className={"text-3xl text-center font-bold"}>
            {capitalizeFirstLetter(removeTags(flashcard.word))}
          </p>
          <p className={"font-mono text-center text-gray-700"}>
            ({flashcard.phonetic})
          </p>
        </div>
      </div>
      <div className={"flex flex-col gap-0.5"}>
        {flashcard.meanings.map((meaning, index) => (
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
        ))}
      </div>
      <div className={"h-12"}>edit</div>
    </div>
  );
};

export default FlashcardCard;
