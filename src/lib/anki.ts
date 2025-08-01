import {Flashcard} from "@/models/flashcard";
import * as googleTTS from "google-tts-api";
import {removeTags} from "./flashcard-formatter";
import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import axiosApi from "@/lib/axios-api";
import {AddCardFeedbackResponseData} from "@/models/api-response";

export const getSelectedMeaningsFlashcards = (flashcards: Flashcard[]) => {
    return flashcards.flatMap((flashcard) => {
        const selectedMeanings = flashcard.selectedMeaningIndex.map(
            (index) => flashcard.meanings[index]
        );
        return selectedMeanings.map((meaning) => {
            return new Flashcard({
                word: flashcard.word,
                phonetic: flashcard.phonetic,
                meanings: [meaning],
                selectedMeaningIndex: [0],
                inputLanguage: flashcard.inputLanguage,
                outputLanguage: flashcard.outputLanguage,
            });
        });
    });
}

const getFlashcardNotes = (flashcards: Flashcard[], selectedDeckname: string) => {
    return flashcards.map((flashcard) => {
        const exampleAudioUrl = googleTTS.getAudioUrl(
            removeTags(flashcard.meanings[0].example),
            {
                lang: flashcard.outputLanguage,
                slow: false,
                host: "https://translate.google.com",
            }
        );

        const wordAudioUrl = googleTTS.getAudioUrl(removeTags(flashcard.word), {
            lang: flashcard.inputLanguage,
            slow: false,
            host: "https://translate.google.com",
        });

        return {
            deckName: selectedDeckname,
            modelName: "Basic",
            options: {
                allowDuplicate: true,
                duplicateScopeOptions: {
                    checkChildren: true,
                    checkAllModels: false,
                },
            },
            audio: [
                {
                    url: wordAudioUrl,
                    filename: `${Math.random()}.mp3`,
                    skipHash: "7e2c2f954ef6051373ba916f000168dc",
                    fields: ["Back"],
                },
                {
                    url: exampleAudioUrl,
                    filename: `${Math.random()}.mp3`,
                    skipHash: "7e2c2f954ef6051373ba916f000168dc",
                    fields: ["Front"],
                },
            ],
            fields: {
                Front: `${flashcard.meanings[0].example}`,
                Back: `${flashcard.word.toUpperCase()} (${
                    flashcard.phonetic
                }) <br>${flashcard.meanings[0].definition.toUpperCase()} <br> ${
                    flashcard.meanings[0].translation.toUpperCase()
                }`,
            },
        };
    });
};

export const syncFlashcardsToAnki = async (flashcards: Flashcard[], selectedDeckName: string) => {
    const response: AxiosResponse<AnkiResponse<AddCardFeedbackResponseData>> = await axiosApi.post(process.env.ANKI_URL!, {
        action: "addNotes",
        version: 6,
        params: {
            notes: [getFlashcardNotes(flashcards, selectedDeckName)].flat(),
        },
    });

    return response.data;
};

