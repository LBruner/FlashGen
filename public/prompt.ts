export const getPrompt = (words: string[], inputLanguage: string, outputLanguage: string) => `
Create language learning flashcards for these words: ${words.join(", ")}.

For EACH word:
1. Show the word highlighted in yellow (use the exact HTML span provided)
2. Include IPA phonetic transcription
3. For each meaning:
   - ${inputLanguage} definition
   - ${inputLanguage} translation
   - Example sentence with the word highlighted
4. Separate flashcards with ###END_FLASHCARD###

FORMAT EXAMPLE:
{
  "word": "<span style=\"color: rgb(231, 217, 15);\">LAUGH</span>",
  "phonetic": "(/læf/)",
  "meanings": [
    {
      "definition": "to make the sound of laughing",
      "translation": "<b>RIR</b>",
      "example": "She <span style=\"color: rgb(231, 217, 15);\">laughed</span> loudly at his joke"
    }
  ]
}###END_FLASHCARD###
If no words, return: { "flashcards": [] }
`;
