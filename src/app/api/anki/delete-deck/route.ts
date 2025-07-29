import {z} from "zod";
import {ApiResponse} from "@/models/ApiResponse";
import {createJsonResponse} from "@/lib/NextApiResponse";
import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import axiosApi from "@/lib/AxiosApi";

const FlashcardArraySchema = z.object({
    deckName: z.string(),
    deleteCardsToo: z.boolean(),
});

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const {deckName, deleteCardsToo} = FlashcardArraySchema.parse(reqBody);

        const ankiResponse: AxiosResponse<AnkiResponse<null>> = await axiosApi.post(process.env.ANKI_URL!, {
            action: "deleteDecks",
            version: 6,
            params: {
                decks: [deckName],
                cardsToo: deleteCardsToo,
            }
        });

        const {error: ankiError} = ankiResponse.data;

        const apiResponse: ApiResponse<[]> = {
            data: [],
            status: ankiError ? 500 : 200,
            errorMessage: ankiError ?? null,
            success: !ankiError,
        };

        return createJsonResponse({...apiResponse});
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Zod Validation Error:", error.errors);
            return new Response(`Bad request. Error: ${error}`, {status: 400});
        }

        console.error(`Something went wrong on deleting deck:`, error);
        return new Response(`Something went wrong: ${error}`, {status: 200});
    }
}
