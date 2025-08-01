import {AxiosResponse} from "axios";
import {AnkiResponse, DeckStatsMap} from "@/models/anki/deck";
import {ApiResponse} from "@/models/api-response";
import axiosApi from "@/lib/axios-api";
import {createJsonResponse} from "@/lib/next-api-response";
import {z} from "zod";
import {noConnectionResponse} from "@/lib/no-connection-response";

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
            return new Response(`Invalid flashcards format: ${error}`, {status: 400});
        }

        console.log(`Something went wrong fetching cards stats: ${error}`);

        return createJsonResponse(noConnectionResponse);
    }
}
