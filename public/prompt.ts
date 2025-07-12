export const getPrompt = (words: string[], inputLanguage: string, outputLanguage: string) => `
Create language learning flashcards for the following words: ${words.join(", ")}.

For EACH word:
1. Show the word highlighted in yellow (use the exact HTML span provided)
2. Include IPA phonetic transcription
3. For each meaning:
   - ${inputLanguage} definition
   - ${outputLanguage} translation
   - Example sentence with the word highlighted

Respond ONLY with valid JSON.

FORMAT:
{
  "flashcards": [
    {
      "word": "<span style=\\"color: rgb(231, 217, 15);\\">LAUGH</span>",
      "phonetic": "(/læf/)",
      "meanings": [
        {
            "definition": "to be alive; have life",
            "translation": "viver",
            "example": "She wants to <span style=\\"color: rgb(231, 217, 15);\\">live</span> a long and happy life."
        }
      ]
    }
  ]
}

If the word list is empty, return: { "flashcards": [] }
`;
