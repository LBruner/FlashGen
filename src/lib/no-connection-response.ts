import {ApiResponse} from "@/models/api-response";

export const noConnectionResponse: ApiResponse<Array<string>> = {
    data: [],
    status: 500,
    errorMessage: `Anki can't be accessed`,
    success: false,
};