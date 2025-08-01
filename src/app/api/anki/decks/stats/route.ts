import {AxiosResponse} from "axios";
import {AnkiResponse, DeckStatsMap} from "@/models/anki/deck";
import {ApiResponse} from "@/models/api-response";
import axiosApi from "@/lib/axios-api";
import {createJsonResponse} from "@/lib/next-api-response";
import {z} from "zod";
import {apiErrorResponse, getZodErrorResponse} from "@/lib/api-error-response";

const DeckNamesArraySchema = z.object({
    decks: z.array(z.string()),
});

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const {decks} = DeckNamesArraySchema.parse(reqBody);

        const ankiResponse: AxiosResponse<AnkiResponse<DeckStatsMap[]>> = await axiosApi.post(process.env.ANKI_URL!, {
            action: "getDeckStats",
            version: 6,
            params: {
                decks
            }
        });

        const {result, error: ankiError} = ankiResponse.data;

        const apiResponse: ApiResponse<DeckStatsMap[]> = {
            data: result,
            status: ankiError ? 500 : 200,
            errorMessage: ankiError ?? null,
            success: !ankiError,
        };

        return createJsonResponse({...apiResponse});
    } catch (error) {
        if (error instanceof z.ZodError) {
            return getZodErrorResponse(error);
        }

        const errorMsg = `Something went wrong fetching cards stats: ${error}`;
        console.log(errorMsg);

        return createJsonResponse(apiErrorResponse(errorMsg));
    }
}
