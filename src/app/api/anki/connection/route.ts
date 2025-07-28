import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/ApiResponse";
import {createJsonResponse} from "@/lib/NextApiResponse";
import axiosApi from "@/lib/AxiosApi";
import {noConnectionResponse} from "@/lib/NoConnectionResponse";

export async function GET(): Promise<Response> {
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
        console.log(`Something went wrong connecting to AnkiConnect API: ${error}`);

        return createJsonResponse(noConnectionResponse);
    }
}
