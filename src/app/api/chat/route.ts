import {ChatBody} from "@/app/models/ChatMessage";
import {chatConfig} from "@/app/models/ChatConfig";
import {fetchHelper} from "@/app/utils/fetchWrapper";

export async function POST(request: Request) {
    const reqBody: ChatBody = await request.json();

    if (!reqBody.messages || !Array.isArray(reqBody.messages)) {
        return new Response("Requisição inválida", {status: 400});
    }

    try {
        const response = await fetchHelper(`${process.env.API_URL}/chat/completions`, {
            method: 'POST',
            body: {
                "model": chatConfig.model,
                "messages": reqBody.messages
            },
        });

        if (response.status !== 200) {
            console.error(response.toString());
            return new Response(`Erro de API: ${response.status}`, {status: response.status});
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.log(`Algo deu errado com a API: ${error}`)
        return new Response('Internal Server Error', {status: 500});
    }
}