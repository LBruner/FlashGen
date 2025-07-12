import { z } from "zod";

const MeaningSchema = z.object({
  definition: z.string(),
  translation: z.string(),
  example: z.string(),
});

export const FlashcardSchema = z.object({
  word: z.string(),
  phonetic: z.string(),
  inputLanguage: z.string(),
  outputLanguage: z.string(),
  meanings: z.array(MeaningSchema),
});

export type Meaning = z.infer<typeof MeaningSchema>;
export type FlashcardCtor = z.infer<typeof FlashcardSchema>;
