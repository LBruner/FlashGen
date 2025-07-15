import {addFlashcards} from "@/lib/Anki";
import {Flashcard} from "@/models/Flashcard";
import {FlashcardSchema} from "@/models/schemas/flashcard-schema";
import {z} from "zod";
import {ApiResponse} from "@/models/ApiResponse";
import {createJsonResponse} from "@/lib/NextApiResponse";

const FlashcardArraySchema = z.object({
    selectedDeckName: z.string(),
    cards: z.array(FlashcardSchema)
});

export async function POST(request: Request) {
    try {
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

        const ankiResponse = await addFlashcards(flashcards, selectedDeckName);

        const {result, error: ankiError} = ankiResponse;

        const apiResponse: ApiResponse<Array<string>> = {
            data: result,
            status: ankiError ? 500 : 200,
            errorMessage: ankiError ?? null,
            success: !ankiError,
        };

        if (ankiResponse.error == null) {
            return new Response(JSON.stringify({
                message: `${flashcards.length} Flashcards adicionados com sucesso!`
            }));
        }

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
