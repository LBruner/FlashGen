export interface ChatMessage {
    role: "user" | "assistant" | "system",
    content: string
}

export interface ChatBody{
    messages: ChatMessage[]
}

type AIMessage = {
    role: string;
    content: string;
};

export type AIResponse = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: AIMessage;
        logprobs: null;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
        prompt_tokens_details: {
            cached_tokens: number;
        };
        prompt_cache_hit_tokens: number;
        prompt_cache_miss_tokens: number;
    };
    system_fingerprint: string;
};