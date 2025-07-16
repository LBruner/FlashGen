import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import {Filter, Search} from "lucide-react";
import {nestDecks} from "@/lib/Decks";

interface DeckListSorterProps {
    decksStats: AnkiDeckStats[];
    setSortedDecksStats: Dispatch<SetStateAction<AnkiDeckStats[]>>
}

const DeckListSorter: React.FC<DeckListSorterProps> = (props) => {
    const {decksStats, setSortedDecksStats} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [showNestedDecks, areDecksNested] = useState(false);

    const onSearchByName = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        areDecksNested(false);

        setSortedDecksStats(
            decksStats.filter((deck) => deck.name.toLowerCase().includes(e.target.value.toLowerCase()))
        );
    }

    const onSetSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
        const sortValue = event.target.value;
        setSortBy(sortValue);
        areDecksNested(false);
        setSearchTerm('');

        const newSortedList = [...decksStats].sort((a, b) => {
            switch (sortValue) {
                case 'totalCards':
                    return b.total_in_deck - a.total_in_deck;
                case 'newCards':
                    return b.new_count - a.new_count;
                case 'reviewCards':
                    return b.review_count - a.review_count;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setSortedDecksStats(newSortedList);
    };

    const toggleDecksNesting = () => {
        const isNowNested = !showNestedDecks;
        areDecksNested(isNowNested);

        if (isNowNested) {
            setSortedDecksStats(nestDecks(decksStats));
        } else {
            setSortedDecksStats(decksStats);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"/>
                <input
                    type="text"
                    placeholder="Search decks..."
                    value={searchTerm}
                    onChange={onSearchByName}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
            </div>
            <select
                value={sortBy}
                onChange={onSetSortBy}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            >
                <option value="name">Sort by Name</option>
                <option value="totalCards">Sort by Total Cards</option>
                <option value="newCards">Sort by New Cards</option>
                <option value="reviewCards">Sort by Review Cards</option>
            </select>
            <button
                onClick={toggleDecksNesting}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                    showNestedDecks
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/20'
                        : 'bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:text-white hover:bg-slate-600/50'
                }`}
            >
                <Filter className="w-5 h-5"/>
                <span>Nested</span>
            </button>
        </div>
    )
}

export default DeckListSorter;