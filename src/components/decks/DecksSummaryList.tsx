import React from "react";
import DecksSummaryItem from "@/components/decks/DecksSummaryItem";
import {IoBookOutline} from "react-icons/io5";
import {FaChartBar} from "react-icons/fa";
import {FaRegClock, FaRegStar} from "react-icons/fa6";

interface DecksSummaryListProps {
    deckStats: {
        totalDecks: number;
        totalCards: number;
        totalNewCards: number;
        totalToReview: number;
    }
}

const DecksSummaryList: React.FC<DecksSummaryListProps> = (props) => {
    const {totalDecks, totalToReview, totalNewCards, totalCards} = props.deckStats;

    return (
        <div className={'flex gap-4'}>
            <div className={'flex-1 flex flex-col gap-2'}>
                <DecksSummaryItem title={'Total Decks'} value={totalDecks} color={'bg-blue-900'}
                                  icon={<IoBookOutline className={'text-blue-300'} size={22}/>}/>
                <DecksSummaryItem title={'Total Cards'} value={totalCards} color={'bg-purple-900'}
                                  icon={<FaChartBar className={'text-purple-300'} size={22}/>}/>
            </div>
            <div className={'flex-1 flex flex-col gap-2'}>
                <DecksSummaryItem title={'New Cards'} value={totalNewCards} color={'bg-green-900'}
                                  icon={<FaRegStar className={'text-green-300'} size={22}/>}/>
                <DecksSummaryItem title={'To Review'} value={totalToReview} color={'bg-orange-900'}
                                  icon={<FaRegClock className={'text-orange-300'} size={22}/>}/>
            </div>
        </div>
    )
}

export default DecksSummaryList;