import {AxiosResponse} from "axios";
import {AnkiDeck, AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/ApiResponse";
import axiosApi from "@/lib/AxiosApi";
import {createJsonResponse} from "@/lib/NextApiResponse";
import {noConnectionResponse} from "@/lib/NoConnectionResponse";

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
