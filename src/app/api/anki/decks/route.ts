import {AxiosResponse} from "axios";
import {AnkiDeck, AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/api-response";
import axiosApi from "@/lib/axios-api";
import {createJsonResponse} from "@/lib/next-api-response";
import {apiErrorResponse, getZodErrorResponse} from "@/lib/api-error-response";
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
        const errorMsg = `Something went wrong fetching user decks: ${error}: ${error}`;
        console.log(errorMsg);

        return createJsonResponse(apiErrorResponse(errorMsg));
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
            return getZodErrorResponse(error);
        }

        const errorMsg = `Something went wrong on creating deck:: ${error}`
        console.log(errorMsg);

        return createJsonResponse(apiErrorResponse(errorMsg));
    }
}