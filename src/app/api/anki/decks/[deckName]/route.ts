import {z} from "zod";
import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import axiosApi from "@/lib/axios-api";
import {ApiResponse} from "@/models/api-response";
import {createJsonResponse} from "@/lib/next-api-response";

export async function DELETE(request: Request, { params }: { params: Promise<{ deckName: string }>}) {
    try {
        const {deckName} = await params;

        const ankiResponse: AxiosResponse<AnkiResponse<null>> = await axiosApi.post(process.env.ANKI_URL!, {
            action: "deleteDecks",
            version: 6,
            params: {
                decks: [deckName],
                cardsToo: true,
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