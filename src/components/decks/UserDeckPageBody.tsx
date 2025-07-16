'use client';

import React, {useState} from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import DecksSummaryList from "@/components/decks/DecksSummaryList";
import DecksList from "@/components/decks/DecksList";
import DeckListSorter from "@/components/decks/DeckListSorter";

interface UserDeckPageBodyProps {
    decksStats: AnkiDeckStats[ ];
}

const getSummaryStats = (decksStats: AnkiDeckStats[]) => {
    return {
        totalDecks: decksStats.length,
        totalCards: decksStats.reduce((acc, deck) => acc + deck.total_in_deck, 0),
        totalNewCards: decksStats.reduce((acc, deck) => acc + deck.new_count, 0),
        totalToReview: decksStats.reduce((acc, deck) => acc + deck.review_count, 0),
    }
}

const UserDeckPageBody: React.FC<UserDeckPageBodyProps> = ({decksStats}) => {
    const [sortedDecks, setSortedDecks] = useState(decksStats);

    return (
        <div className={'py-8 px-12 h-screen overflow-y-scroll'}>
            <div className={'mb-4'}>
                <p className={'text-3xl font-bold'}>My Decks</p>
                <p className={'text-lg text-gray-400'}>manage your flashcard collections</p>
            </div>
            <div className={'flex flex-col gap-8'}>
                <DecksSummaryList deckStats={getSummaryStats(sortedDecks)}/>
                <DeckListSorter decksStats={decksStats}
                                setSortedDecksStats={setSortedDecks}/>
                <DecksList decksStats={sortedDecks}/>
            </div>
        </div>
    )
}

export default UserDeckPageBody;