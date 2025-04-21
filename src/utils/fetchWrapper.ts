type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: any;
};

export const fetchHelper = async (url: string, options: FetchOptions = {}) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
        Authorization: process.env.AUTHORIZATION_TOKEN!,
    };

    const headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    return await fetch(url, {
        method: options.method || "GET",
        headers,
        body: JSON.stringify(options.body),
    });
};