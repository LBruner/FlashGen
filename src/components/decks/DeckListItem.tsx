import React from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import {IoBookOutline} from "react-icons/io5";
import {Settings} from "lucide-react";

interface DeckListItemProps {
    decksStats: AnkiDeckStats;
}

const DeckListItem: React.FC<DeckListItemProps> = (props) => {
    const {name, total_in_deck, new_count, review_count} = props.decksStats;
    return (
        <div className={'bg-gray-700 w-full px-6 py-4 rounded-xl'}>
            <div className={'flex flex-col gap-2'}>
                <div className={'flex items-center justify-between'}>
                    <div className={'flex items-center gap-4 '}>
                        <div className={`p-3 rounded-xl bg-red-200`}>
                            <IoBookOutline size={20}/>
                        </div>
                        <div>
                            <p className={'text-xl font-bold'}>{name}</p>
                            <p>12 day streak</p>
                        </div>
                    </div>
                    <div>
                        <Settings/>
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