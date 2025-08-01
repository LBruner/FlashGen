export type FlashcardCtor = {
    word: string;
    phonetic: string;
    meanings: Meaning[];
    selectedMeaningIndex?: number[];
    inputLanguage?: string;
    outputLanguage?: string;
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
    inputLanguage: string;
    outputLanguage: string;

    constructor(flashcard: FlashcardCtor) {
        this.word = flashcard.word;
        this.phonetic = flashcard.phonetic;
        this.meanings = flashcard.meanings;
        this.selectedMeaningIndex = flashcard.selectedMeaningIndex ?? [0];
        this.inputLanguage = flashcard.inputLanguage ?? 'en';
        this.outputLanguage = flashcard.inputLanguage ?? 'pt';
    }
}
