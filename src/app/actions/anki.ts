'use server';

import {AnkiDeck, AnkiDeckStats, DeckStatsMap} from "@/models/anki/deck";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import axiosApi from "@/lib/AxiosApi";
import {ankiPaths} from "@/path-routes";

export const pegaTodosDecks = async (): Promise<AnkiDeck[]> => {
    try {
        const response: AxiosResponse<ApiResponse<Array<string>>> = await axiosApi.get(ankiPaths.getDeckList());
        return response.data.data.map((deck: string) => deck);
    } catch (e) {
        console.log(`Algo deu errado ao buscar os decks: ${e}`);
        return [];
    }
}

export const pegaStatDosDecks = async (deckNames: AnkiDeck[]): Promise<AnkiDeckStats[]> =>{
    console.log(JSON.stringify(deckNames[32]));
    const decksWithStats: AxiosResponse<ApiResponse<DeckStatsMap>> = await axiosApi.post(ankiPaths.getDeckStats(), {
        decks: deckNames
    });

    return Object.values(decksWithStats.data.data).map((deck: AnkiDeckStats) => {
        const fullName = deckNames.find((name) => name.endsWith(deck.name)) || deck.name;

        return {
            ...deck,
            name: fullName
        };
    });
}