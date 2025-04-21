export type FlashcardCtor = {
    word: string;
    phonetic: string;
    meanings: Meaning[];
    selectedMeaningIndex?: number[];
    language?: string;
};

type Meaning = {
    definition: string;
    translation: string;
    example: string;
};

export class Flashcard {
    word: string;
    phonetic: string;
    meanings: Meaning[];
    selectedMeaningIndex: number[] = [0];
    language: string;

    constructor(flashcard: FlashcardCtor) {
        this.word = flashcard.word;
        this.phonetic = flashcard.phonetic;
        this.meanings = flashcard.meanings;
        this.selectedMeaningIndex = flashcard.selectedMeaningIndex ?? [0];
        this.language = flashcard.language ?? 'English';
    }
}
