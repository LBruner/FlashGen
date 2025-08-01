export type ApiResponse<T> = {
    success: boolean;
    status: number;
    data: T;
    errorMessage: string | null;
}

export type AddCardFeedbackResponseData = {
    addedCards: number;
    deckName: string;
    executionTime: number;
}