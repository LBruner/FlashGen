import {Flashcard} from "@/models/Flashcard";
import * as googleTTS from "google-tts-api";
import {removeTags} from "./FlashcardFormatter";
import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import axiosApi from "@/lib/AxiosApi";

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

export const addFlashcards = async (flashcards: Flashcard[], selectedDeckname: string) => {
    console.log(JSON.stringify({
        action: "addNotes",
        version: 6,
        params: {
            notes: [getFlashcardNotes(flashcards, selectedDeckname)].flat(),
        },
    }))

    const response: AxiosResponse<AnkiResponse> = await axiosApi.post(process.env.ANKI_URL!, {
        action: "addNotes",
        version: 6,
        params: {
            notes: [getFlashcardNotes(flashcards, selectedDeckname)].flat(),
        },
    });

    return response.data;
};
