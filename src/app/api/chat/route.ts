import {AIResponse, ChatBody} from "@/models/chat-message";
import {chatConfig} from "@/models/chat-config";
import axiosApi from "@/lib/axios-api";
import {ApiResponse} from "@/models/api-response";
import {createJsonResponse} from "@/lib/next-api-response";

export async function POST(request: Request) {
    const reqBody: ChatBody = await request.json();

    if (!reqBody.messages || !Array.isArray(reqBody.messages)) {
        return new Response("Requisição inválida", {status: 400});
    }

    console.log(JSON.stringify({
        body: {
            model: chatConfig.apiModel,
            messages: reqBody.messages,
            stream: false,
        },
    }))

    try {
        const response = await axiosApi.post(`${process.env.AI_API_URL}/chat/completions`, {
            model: chatConfig.apiModel,
            messages: reqBody.messages,
            stream: false,
        }, {
            headers: {
                Authorization: process.env.API_AUTHORIZATION_TOKEN!,
            }
        });

        if (response.status != 200) {
            return new Response(`Erro de API: ${response}`, {status: response.status});
        }

        const data: AIResponse = await response.data;

        console.log(data.choices[0].message.content);
        const raw = data.choices[0].message.content;
        const cleanedData = raw.replace(/```json\n?/, "").replace(/```$/, "").trim();

        console.log(cleanedData);

        const apiResponse: ApiResponse<Array<string>> = {
            data: [cleanedData],
            status: response.status,
            errorMessage: response.status == 200 ? null : `Erro de API: ${response}`,
            success: response.status == 200,
        };

        return createJsonResponse(apiResponse);
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}