import {AnkiDeckStats} from "@/models/anki/deck";

export type NestedAnkiDeckStats = AnkiDeckStats & {
    sub_decks: NestedAnkiDeckStats[];
};

export const nestDecks = (decks: AnkiDeckStats[]): NestedAnkiDeckStats[] => {
    const deckMap = new Map<string, NestedAnkiDeckStats>();

    decks.forEach(deck => {
        deckMap.set(deck.name, {...deck, sub_decks: []});
    });

    deckMap.forEach(deckNode => {
        if (deckNode.name.includes('::')) {
            const parts = deckNode.name.split('::');
            const parentName = parts.slice(0, -1).join('::');
            const parentNode = deckMap.get(parentName);

            if (parentNode) {
                parentNode.sub_decks.push(deckNode);
            }
        }
    });

    const topLevelDecks = [...deckMap.values()].filter(
        deck => !deck.name.includes('::')
    );

    const sumStatsRecursively = (deck: NestedAnkiDeckStats) => {
        if (deck.sub_decks.length === 0) {
            return;
        }

        deck.sub_decks.forEach(subDeck => {
            sumStatsRecursively(subDeck);

            deck.new_count += subDeck.new_count;
            deck.learn_count += subDeck.learn_count;
            deck.review_count += subDeck.review_count;
            deck.total_in_deck += subDeck.total_in_deck;
        });
    };

    topLevelDecks.forEach(sumStatsRecursively);

    return topLevelDecks;
};
