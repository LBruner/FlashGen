'use client';

import React, {useEffect, useState} from "react";
import {AnkiDeckStats} from "@/models/anki/deck";
import DecksSummaryList from "@/components/decks/DecksSummaryList";
import DecksList from "@/components/decks/DecksList";
import DeckListSorter from "@/components/decks/DeckListSorter";
import {pegaStatDosDecks, pegaTodosDecks} from "@/app/actions/anki";
import CustomSpinner from "@/components/UI/CustomSpinner";
import NoDecksEmptyState from "@/components/decks/NoDecksEmptyState";
import {useAppSettings} from "@/store/context/settings-context-provider";
import UserCardsNoConnection from "@/components/decks/NoConnectionDeckState";
import axiosApi from "@/lib/AxiosApi";
import {ankiPaths} from "@/path-routes";
import {toast} from "react-toastify";
import CustomNotificationContainer from "@/components/UI/toast/CustomNotificationContainer";
import {useTheme} from "next-themes";

const getSummaryStats = (decksStats: AnkiDeckStats[]) => {
    return {
        totalDecks: decksStats.length,
        totalCards: decksStats.reduce((acc, deck) => acc + deck.total_in_deck, 0),
        totalNewCards: decksStats.reduce((acc, deck) => acc + deck.new_count, 0),
        totalToReview: decksStats.reduce((acc, deck) => acc + deck.review_count, 0),
    }
}

const UserDeckPageBody: React.FC = () => {
    const [userDecks, setUserDecks] = useState<AnkiDeckStats[]>([]);
    const [sortedDecks, setSortedDecks] = useState<AnkiDeckStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAnkiConnected} = useAppSettings();
    const {theme} = useTheme();

    useEffect(() => {
        fetchDecksData().then();
    }, [isAnkiConnected]);

    useEffect(() => {
        toast.dismiss();
    }, [theme]);

    const fetchDecksData = async (): Promise<void> => {
        setIsLoading(true);
        const userDecks = await pegaTodosDecks();
        const decksDetails = await pegaStatDosDecks(userDecks);
        setUserDecks(decksDetails);
        setSortedDecks(decksDetails);
        setIsLoading(false);
    }

    if (isLoading) {
        return <CustomSpinner/>
    }

    if (!isAnkiConnected) {
        return <UserCardsNoConnection/>
    }

    if (userDecks.length === 0) {
        return <NoDecksEmptyState/>;
    }

    const manageDeck = async (operation: DeckOperation, deckName: string) => {
        let title = '';
        let content = '';

        let endpointRoute = operation === 'CREATE' ? ankiPaths.getCreateDeck() : ankiPaths.getDeleteDeck();
        console.log(endpointRoute);

        try {
            const {data} = await axiosApi.post(endpointRoute, {
                deckName,
            });

            const wasSuccessful = data!.success;

            if (wasSuccessful) {
                title = `Success!`
                content = `Deck: ${deckName} ${operation == 'CREATE' ? 'created' : 'deleted'} successfully.`
            } else {
                title = 'Error'
                content = data!.errorMessage!;
            }

            toast(CustomNotificationContainer, {
                data: {
                    title,
                    content,
                    actionButton: <div></div>
                },
                autoClose: 2000,
                closeButton: false,
                type: wasSuccessful ? 'success' : 'error',
                theme: theme,
            });

            if (wasSuccessful) {
                await fetchDecksData();
            }
        } catch
            (e) {
            console.log(e);
        }
    }

    return (
        <div
            className={'py-8 px-12 h-screen overflow-y-scroll bg-white dark:bg-gray-900 transition-colors duration-200'}>
            <div className={'mb-4'}>
                <p className={'text-3xl font-bold text-gray-900 dark:text-white'}>My Decks</p>
                <p className={'text-lg dark:text-gray-400 text-gray-700'}>manage your flashcard collections</p>
            </div>
            <div className={'flex flex-col gap-8'}>
                <DecksSummaryList deckStats={getSummaryStats(sortedDecks)}/>
                <DeckListSorter unsortedDecks={userDecks} sortedDecks={sortedDecks}
                                setSortedDecksStats={setSortedDecks} manageDeck={manageDeck}/>
                <DecksList decksStats={sortedDecks} manageDeck={manageDeck}/>
            </div>
        </div>
    )
}

export default UserDeckPageBody;

export type DeckOperation = 'CREATE' | 'DELETE';
