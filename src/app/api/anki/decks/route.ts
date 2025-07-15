import {AxiosResponse} from "axios";
import {AnkiDeck, AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/ApiResponse";
import axiosApi from "@/lib/AxiosApi";
import {createJsonResponse} from "@/lib/NextApiResponse";

export async function GET(_: Request) {
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
        console.log(`Algo deu errado com a busca dos decks: ${error}`);
        return new Response(JSON.stringify({error: "Internal Server Error", data: []}), {status: 500});
    }
}
