import React from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import DeckListItem from "@/components/decks/DeckListItem";

interface DecksListProps {
    decksStats: AnkiDeckStats[];
}

const DecksList: React.FC<DecksListProps> = (props) => {
    const {decksStats} = props;

    return (
        <div className={'flex flex-col gap-4'}>
            {decksStats.map((deckStat) => <DeckListItem decksStats={deckStat} key={deckStat.deck_id}/>)}
        </div>
    )
}

export default DecksList;