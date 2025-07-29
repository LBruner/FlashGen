import {z} from "zod";
import {ApiResponse} from "@/models/ApiResponse";
import {createJsonResponse} from "@/lib/NextApiResponse";
import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import axiosApi from "@/lib/AxiosApi";

const FlashcardArraySchema = z.object({
    deckName: z.string(),
});

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const {deckName} = FlashcardArraySchema.parse(reqBody);

        const ankiResponse: AxiosResponse<AnkiResponse<null>> = await axiosApi.post(process.env.ANKI_URL!, {
            action: "createDeck",
            version: 6,
            params: {
                deck: deckName,
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

        const errorMessage = 'Something went wrong on creating deck:';

        console.error(errorMessage + error);
        return new Response(`${errorMessage} ${error}`, {status: 200});
    }
}
