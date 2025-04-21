import { Button, select } from "@heroui/react";
import FlashcardCardList from "../flashcards-card/flashcards-cards-list";
import { Flashcard } from "@/models/Flashcard";
import React from "react";

interface FlashCardResultsProps {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

const FlashCardResults: React.FC<FlashCardResultsProps> = ({
  flashcards,
  setFlashcards,
}) => {
  const onCreateFlashcards = async () => {
    const flattenFlashcards: Flashcard[] = flashcards.flatMap((flashcard) => {
      const selectedMeanings = flashcard.selectedMeaningIndex.map(
        (index) => flashcard.meanings[index]
      );
      return selectedMeanings.map((meaning) => {
        return new Flashcard({
          word: flashcard.word,
          phonetic: flashcard.phonetic,
          meanings: [meaning],
          selectedMeaningIndex: [0],
          language: flashcard.language
        });
      });
    });
    console.log(flattenFlashcards)

    await fetch("/api/flashcards", {
      method: "POST",
      body: JSON.stringify(flattenFlashcards),
    });
  };

  return (
    <div>
      <FlashcardCardList
        flashcards={flashcards}
        setFlashcards={setFlashcards}
      />
      <Button onPress={onCreateFlashcards} color="primary">
        Add Cards
      </Button>
    </div>
  );
};

export default FlashCardResults;
