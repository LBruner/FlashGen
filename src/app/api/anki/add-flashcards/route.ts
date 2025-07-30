import {syncFlashcardsToAnki} from "@/lib/Anki";
import {Flashcard} from "@/models/Flashcard";
import {FlashcardSchema} from "@/models/schemas/flashcard-schema";
import {z} from "zod";
import {AddCardFeedbackResponseData, ApiResponse} from "@/models/ApiResponse";
import {createJsonResponse} from "@/lib/NextApiResponse";

const FlashcardArraySchema = z.object({
    selectedDeckName: z.string(),
    cards: z.array(FlashcardSchema)
});

export async function POST(request: Request) {
    try {
        const startTimer = performance.now();

        const reqBody = await request.json();
        const {selectedDeckName, cards} = FlashcardArraySchema.parse(reqBody);
        const flashcards: Flashcard[] = cards.map((item) => new Flashcard(item));

        if (flashcards.length === 0) {
            return createJsonResponse({
                data: null,
                status: 500,
                errorMessage: 'Nenhum flashcard foi enviado',
                success: false,
            })
        }

        const ankiResponse = await syncFlashcardsToAnki(flashcards, selectedDeckName);

        const {result, error: ankiError} = ankiResponse;

        const endTimer = performance.now();

        const apiResponse: ApiResponse<AddCardFeedbackResponseData> = {
            data: ankiError ? result : {
                addedCards: flashcards.length,
                executionTime: (endTimer - startTimer) / 1000,
                deckName: selectedDeckName,
            },
            status: ankiError ? 500 : 200,
            errorMessage: ankiError ?? null,
            success: !ankiError,
        };

        return createJsonResponse({...apiResponse});
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Erro de validação Zod:", error.errors);
            return new Response(`Formato inválido de flashcards. Erro: ${error}`, {status: 400});
        }

        console.error("Erro interno:", error);
        return new Response("Erro no servidor.", {status: 500});
    }
}
