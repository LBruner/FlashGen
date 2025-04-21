import {ChatBody} from "@/models/ChatMessage";
import {fetchHelper} from "@/utils/fetchWrapper";
import {chatConfig} from "@/models/ChatConfig";

export async function POST(request: Request) {
    const reqBody: ChatBody = await request.json();

    if (!reqBody.messages || !Array.isArray(reqBody.messages)) {
        return new Response("Requisição inválida", {status: 400});
    }

    try {
        const response = await fetchHelper(`${process.env.LOCAL_API_URL}/chat/completions`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: {
                model: chatConfig.localModel,
                messages: reqBody.messages,
                stream: true,
            },
        });

        if (!response.ok || !response.body) {
            return new Response(`Erro de API: ${response}`, {status: response.status});
        }

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body!.getReader();
                const decoder = new TextDecoder();

                async function push() {
                    const {done, value} = await reader.read();
                    if (done) {
                        controller.close();
                        return;
                    }
                    controller.enqueue(decoder.decode(value));
                    await push();
                }

                await push();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}