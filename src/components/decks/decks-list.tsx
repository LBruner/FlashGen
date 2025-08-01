import React from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import DeckListItem from "@/components/decks/deck-list-item";
import {DeckOperation} from "@/components/decks/user-deck-page-body";

interface DecksListProps {
    decksStats: AnkiDeckStats[];
    manageDeck: (operation: DeckOperation, deckName: string) => Promise<void>;
}

const DecksList: React.FC<DecksListProps> = (props) => {
    const {decksStats, manageDeck} = props;

    return (
        <div className={'flex flex-col gap-4'}>
            {decksStats.map((deckStat) =>
                <DeckListItem
                    decksStats={deckStat}
                    key={deckStat.deck_id}
                    manageDeck={manageDeck}
                />)}
        </div>
    )
}

export default DecksList;