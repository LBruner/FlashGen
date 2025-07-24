import React from "react";
import {pegaStatDosDecks, pegaTodosDecks} from "@/app/actions/anki";
import UserDeckPageBody from "@/components/decks/UserDeckPageBody";

const UserDecksPage: React.FC = async () => {
    const deckNames = await pegaTodosDecks();
    const deckStats = await pegaStatDosDecks(deckNames);

    return (
        <div className={'w-full'}>
            <UserDeckPageBody decksStats={deckStats}/>
        </div>
    )
}

export default UserDecksPage;