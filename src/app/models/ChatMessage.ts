export interface ChatMessage {
    role: "user" | "assistant" | "system",
    content: string
}

export interface ChatBody{
    messages: ChatMessage[]
}
