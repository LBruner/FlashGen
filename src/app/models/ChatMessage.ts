export interface ChatMessage {
    role: string,
    content: string
}

export interface ChatBody{
    messages: ChatMessage[]
}
