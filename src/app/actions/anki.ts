import {AnkiDeck, AnkiDeckStats, DeckStatsMap} from "@/models/anki/deck";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@/models/api-response";
import axiosApi from "@/lib/axios-api";
import {ankiPaths} from "@/path-routes";

export const pegaTodosDecks = async (): Promise<AnkiDeck[]> => {
    try {
        const response: AxiosResponse<ApiResponse<Array<string>>> = await axiosApi.get(ankiPaths.getDecksEndpoint());

        if(!response.data.success){
            throw new Error(response.data.errorMessage?.toString());
        }

        return response.data.data.map((deck: string) => deck);
    } catch (e) {
        console.log(`Something went wrong fetching user decks: ${e}`);
        return [];
    }
}

export const pegaStatDosDecks = async (deckNames: AnkiDeck[]): Promise<AnkiDeckStats[]> => {
    try {
        const decksWithStats: AxiosResponse<ApiResponse<DeckStatsMap>> = await axiosApi.post(ankiPaths.getDeckStats(), {
            decks: deckNames
        });

        if(!decksWithStats.data.success){
            throw new Error(decksWithStats.data.errorMessage?.toString());
        }

        return Object.values(decksWithStats.data.data).map((deck: AnkiDeckStats) => {
            const fullName = deckNames.find((name) => name.endsWith(deck.name)) || deck.name;

            return {
                ...deck,
                name: fullName
            };
        });
    }
    catch (e) {
        console.log(`Something went wrong fetching decks stats: ${e}`);
        return [];
    }
}