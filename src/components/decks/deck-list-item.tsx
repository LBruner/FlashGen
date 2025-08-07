'use client';
import React from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import {Trash2} from "lucide-react";
import {PiCards} from "react-icons/pi";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import {DeckOperation} from "@/components/decks/user-deck-page-body";

interface DeckListItemProps {
    decksStats: AnkiDeckStats;
    manageDeck: (operation: DeckOperation, deckName: string) => Promise<void>;
}

const DeckListItem: React.FC<DeckListItemProps> = (props) => {
    const {name, total_in_deck, new_count, review_count} = props.decksStats;
    const {manageDeck} = props;

    return (
        <div
            className={'bg-white border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-800 w-full px-6 py-4 rounded-xl'}>
            <div className={'flex flex-col gap-2'}>
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-start gap-4 '}>
                        <div className={`p-3 rounded-xl bg-red-50 dark:bg-gray-500`}>
                            <PiCards size={20}/>
                        </div>
                        <div>
                            <p className={'text-2xl font-bold'}>{name}</p>
                        </div>
                    </div>
                    <div className={'flex gap-2'}>
                        <Popover backdrop={'opaque'} placement="left-end">
                            <PopoverTrigger>
                                <button><Trash2 color={'red'}/></button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[240px] border dark:border-gray-700">
                                {(_) => (
                                    <div className="flex flex-col gap-2 w-full p-4">
                                        <p className="font-semibold text-xl text-red-700 dark:text-red-400">
                                            Delete Deck
                                        </p>
                                        <p>Are you sure you wish to delete the selected deck?</p>
                                        <Button className={'dark:text-red-400'} variant={'bordered'}
                                                color={'danger'} onPress={() => {
                                            manageDeck('DELETE', name).then();
                                        }}>
                                            Confirm
                                        </Button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="w-full h-2 bg-slate-400/50 rounded-full mb-2">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                    style={{width: `${(new_count / total_in_deck) * 100}%`}}
                                ></div>
                            </div>
                            <p className="text-2xl font-bold text-green-400">{new_count}</p>
                            <p className="text-slate-400 text-xs">New</p>
                        </div>
                        <div className="text-center">
                            <div className="w-full h-2 bg-slate-400/50 rounded-full mb-2">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                    style={{width: `${(review_count / total_in_deck) * 100}%`}}
                                ></div>
                            </div>
                            <p className="text-2xl font-bold text-orange-400">{review_count}</p>
                            <p className="text-slate-400 text-xs">Review</p>
                        </div>
                        <div className="text-center">
                            <div className="w-full h-2 bg-slate-400/50 rounded-full mb-2">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                     style={{width: '100%'}}></div>
                            </div>
                            <p className="text-2xl font-bold text-blue-400">{total_in_deck}</p>
                            <p className="text-slate-400 text-xs">Total</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeckListItem;