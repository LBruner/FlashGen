import { Flashcard } from "@/models/Flashcard";
import * as googleTTS from "google-tts-api";
import { removeTags } from "./flashcard";

const getFlashcardNotes = (flashcards: Flashcard[]) => {
  return flashcards.map((flashcard) => {
    console.log(flashcard.language)
    const exampleAudioUrl = googleTTS.getAudioUrl(
      removeTags(flashcard.meanings[0].example),
      {
        lang: flashcard.language == 'English' ? 'en' : 'fr',
        slow: false,
        host: "https://translate.google.com",
      }
    );

    const wordAudioUrl = googleTTS.getAudioUrl(removeTags(flashcard.word), {
      //TODO: ADD MORE COMBINATIONS
      lang: flashcard.language == 'English' ? 'en' : 'fr',
      slow: false,
      host: "https://translate.google.com",
    });

    return {
      deckName: "API",
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
          flashcard.meanings[0].translation
        }`,
      },
    };
  });
};

export const addFlashcards = async (flashcards: Flashcard[]) => {
  console.log(
    JSON.stringify({
      action: "addNotes",
      version: 6,
      params: {
        notes: [getFlashcardNotes(flashcards)].flat(),
      },
    })
  );

  await fetch(process.env.ANKI_URL!, {
    method: "POST",
    body: JSON.stringify({
      action: "addNotes",
      version: 6,
      params: {
        notes: [getFlashcardNotes(flashcards)].flat(),
      },
    }),
  });
};
