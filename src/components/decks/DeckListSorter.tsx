import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import {Filter, Layers, Plus, Search, X} from "lucide-react";
import {nestDecks} from "@/lib/Decks";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import {Input} from "@heroui/input";
import {DeckOperation} from "@/components/decks/UserDeckPageBody";

interface DeckListSorterProps {
    decksStats: AnkiDeckStats[];
    setSortedDecksStats: Dispatch<SetStateAction<AnkiDeckStats[]>>
    manageDeck: (operation: DeckOperation, deckName: string) => Promise<void>;
}

const DeckListSorter: React.FC<DeckListSorterProps> = (props) => {
    const {decksStats, setSortedDecksStats, manageDeck} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [showNestedDecks, areDecksNested] = useState(false);

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [newDeckName, setNewDeckName] = React.useState('');

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
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-slate-400 w-5 h-5"/>
                <input
                    type="text"
                    placeholder="Search decks..."
                    value={searchTerm}
                    onChange={onSearchByName}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-slate-600/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm"
                />
            </div>
            <select
                value={sortBy}
                onChange={onSetSortBy}
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-slate-600/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm"
            >
                <option value="name">Sort by Name</option>
                <option value="totalCards">Sort by Total Cards</option>
                <option value="newCards">Sort by New Cards</option>
                <option value="reviewCards">Sort by Review Cards</option>
            </select>
            <button
                onClick={toggleDecksNesting}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm ${
                    showNestedDecks
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700 dark:text-white border border-blue-300 dark:border-blue-500/20'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-slate-400 border border-gray-300 dark:border-slate-600/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-600/50'
                }`}
            >
                <Filter className="w-5 h-5"/>
                <span className={'w-20'}>{!showNestedDecks ? 'Group' : 'Ungroup'}</span>
            </button>
            <Popover onOpenChange={(open) => setIsPopoverOpen(open)} isOpen={isPopoverOpen} backdrop={'transparent'} showArrow offset={10} placement="bottom">
                <PopoverTrigger>
                    <button
                        onClick={() => {
                        }}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2  border border-gray-300 dark:border-slate-600/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm`}
                    >
                        <Plus/>
                        <span>Create New Deck</span>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    {(_) => (
                        <div className="p-4 w-full flex flex-col gap-4">
                            <div className={'flex gap-2'}>
                                <div
                                    className={'h-auto flex items-center p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl '}>
                                    <Layers size={28} color={'blue'}/>
                                </div>
                                <div>
                                    <p className={'font-bold text-xl'}>Create New Deck</p>
                                    <p className={'text-gray-500 text-lg'}>Organize your content into a new deck</p>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        setIsPopoverOpen(false);
                                    }}><X/></button>
                                </div>
                            </div>
                            <div>
                                <Input value={newDeckName} onValueChange={setNewDeckName} label={'Deck Name'} isRequired={true} labelPlacement={'inside'}/>
                            </div>
                            <div className={'flex gap-2'}>
                                <Button onPress={() => {
                                    setIsPopoverOpen(false);
                                }} className={'flex-1'} variant={'ghost'}>Cancel</Button>
                                <Button onPress={() =>{ manageDeck('CREATE', newDeckName).then();}} className={'flex-1 font-bold bg-blue-600 text-white'}>
                                    + Create Deck
                                </Button>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default DeckListSorter;