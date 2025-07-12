'use server';

import {AnkiDeck} from "@/models/anki/deck";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import axiosApi from "@/lib/AxiosApi";

export const pegaTodosDecks = async (): Promise<AnkiDeck[]> => {
    try {
        const response: AxiosResponse<ApiResponse<Array<string>>> = await axiosApi.get(`${process.env.LOCAL_API_URL}/anki/decks`);

        console.log('Decks', response.data);
        return response.data.data.map((deck: string) => deck);
    } catch (e) {
        console.log(`Algo deu errado ao buscar os decks: ${e}`);
        return [];
    }
}