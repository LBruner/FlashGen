import {Flashcard} from "@/models/flashcard";
import {Meaning} from "@/models/schemas/flashcard-schema";

//TODO: Find a way to add audio to exported cards. Maybe make a request to add
// the audio and then reference it on the card. Or edit it and add it

export class AnkiExporter {
    static exportAsTSV(flashcards: Flashcard[]): string {
        const lines: string[] = [];

        flashcards.forEach(card => {
            card.selectedMeaningIndex.forEach(index => {
                const meaning = card.meanings[index];
                if (meaning) {
                    const front = this.buildFrontContent(meaning);
                    const back = this.buildBackContent(card, meaning);

                    lines.push(`${front}\t${back}`);
                }
            });
        });

        return lines.join('\n');
    }

    private static buildFrontContent(meaning: Meaning): string {
        const cleanExample = meaning.example.replace(/\[sound:[^\]]+]/g, '').trim();
        return `${cleanExample}`;
    }

    private static buildBackContent(card: Flashcard, meaning: Meaning): string {
        const styledWord = card.word;
        const phonetic = card.phonetic ? ` (${card.phonetic})` : '';
        const definition = meaning.definition.toUpperCase();
        const translation = meaning.translation.toUpperCase();

        const backCard = `${styledWord.toUpperCase()}${phonetic}<br>${definition}<br><b>${translation}</b>`;
        console.log(backCard)
        return backCard;
    }

    static downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
        const blob = new Blob([content], {type: mimeType});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    static exportToAnkiTSV(flashcards: Flashcard[], filename: string = 'flashcards.tsv') {
        const tsvContent = this.exportAsTSV(flashcards);
        this.downloadFile(tsvContent, filename, 'text/tab-separated-values');
    }
}
