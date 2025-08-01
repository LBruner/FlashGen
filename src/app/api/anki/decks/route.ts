import {AxiosResponse} from "axios";
import {AnkiDeck, AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/api-response";
import axiosApi from "@/lib/axios-api";
import {createJsonResponse} from "@/lib/next-api-response";
import {noConnectionResponse} from "@/lib/no-connection-response";
import {z} from "zod";

export async function GET() {
    try {
        const ankiResponse: AxiosResponse<AnkiResponse<AnkiDeck[]>> = await axiosApi.post(process.env.ANKI_URL!, {
            action: "deckNames",
            version: 6,
        });

        const {result, error: ankiError} = ankiResponse.data;

        const apiResponse: ApiResponse<Array<string>> = {
            data: result,
            status: ankiError ? 500 : 200,
            errorMessage: ankiError ?? null,
            success: !ankiError,
        };

        return createJsonResponse({...apiResponse});
    } catch (error) {
        console.log(`Something went wrong fetching user decks: ${error}`);

        return createJsonResponse(noConnectionResponse);
    }
}

const CreateDeckSchema = z.object({
    deckName: z.string(),
});

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const {deckName} = CreateDeckSchema.parse(reqBody);

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