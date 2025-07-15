import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/ApiResponse";
import {createJsonResponse} from "@/lib/NextApiResponse";
import axiosApi from "@/lib/AxiosApi";

export async function GET(_: Request): Promise<Response> {
    try {
        const ankiResponse: AxiosResponse<AnkiResponse<number>> = await axiosApi.post(process.env.ANKI_URL!, {
            action: 'version',
            version: 6
        });

        const {result, error: ankiError} = ankiResponse.data;

        const apiResponse: ApiResponse<Array<string>> = {
            data: [result.toString()],
            status: ankiError ? 500 : 200,
            errorMessage: ankiError ?? null,
            success: !ankiError,
        };

        return createJsonResponse({...apiResponse});
    } catch (error) {
        console.log(`Algo deu errado com a conexão a API do Anki: ${error}`);
        return new Response(JSON.stringify({error: "Internal Server Error", data: []}), {status: 500});
    }
}
