import {AxiosResponse} from "axios";
import {AnkiResponse} from "@/models/anki/deck";
import {ApiResponse} from "@/models/api-response";
import {createJsonResponse} from "@/lib/next-api-response";
import axiosApi from "@/lib/axios-api";
import {apiErrorResponse} from "@/lib/api-error-response";

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
        const errorMsg= `Something went wrong connecting to AnkiConnect API: ${error}`;
        console.log(errorMsg);

        return createJsonResponse(apiErrorResponse(errorMsg));
    }
}
