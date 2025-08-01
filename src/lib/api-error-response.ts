import {ApiResponse} from "@/models/api-response";
import {createJsonResponse} from "@/lib/next-api-response";
import {z, ZodIssue} from "zod";

export const apiErrorResponse = (errorMessage: string | ZodIssue[]): ApiResponse<Array<ZodIssue[]>> => {
    return {
        data: [],
        status: 200,
        errorMessage: errorMessage,
        success: false,
    }
}

export const getZodErrorResponse = (error: z.ZodError) => {
    const zodErrorMsg = error.errors;
    console.log(zodErrorMsg);

    return createJsonResponse(apiErrorResponse(zodErrorMsg));
}