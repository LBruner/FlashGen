import {AxiosResponse} from "axios";
import {AnkiResponse, DeckStatsMap} from "@/models/anki/deck";
import {ApiResponse} from "@/models/ApiResponse";
import axiosApi from "@/lib/AxiosApi";
import {createJsonResponse} from "@/lib/NextApiResponse";
import {z} from "zod";

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
            return new Response(`Formato inválido de flashcards. ${error}`, {status: 400});
        }

        console.log(`Algo deu errado com a conexão a API do Anki: ${error}`);
        return new Response(JSON.stringify({error: "Internal Server Error", data: []}), {status: 500});
    }
}
