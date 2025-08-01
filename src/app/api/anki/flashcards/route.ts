import {syncFlashcardsToAnki} from "@/lib/anki";
import {Flashcard} from "@/models/flashcard";
import {FlashcardSchema} from "@/models/schemas/flashcard-schema";
import {z} from "zod";
import {AddCardFeedbackResponseData, ApiResponse} from "@/models/api-response";
import {createJsonResponse} from "@/lib/next-api-response";
import {apiErrorResponse, getZodErrorResponse} from "@/lib/api-error-response";

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
                errorMessage: 'No flashcards were sent.',
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
            return getZodErrorResponse(error);
        }

        const errorMessage = 'Something went wrong on creating flashcards:' + error;
        console.log(errorMessage);

        return createJsonResponse(apiErrorResponse(errorMessage));
    }
}
