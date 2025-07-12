export function createJsonResponse<T>(data: T, options?: ResponseInit): Response {
    return new Response(JSON.stringify(data), {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
        },
    });
}
