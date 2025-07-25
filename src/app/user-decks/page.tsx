import React from "react";
import UserDeckPageBody from "@/components/decks/UserDeckPageBody";

const UserDecksPage: React.FC = async () => {
    return (
        <div className={'w-full'}>
            <UserDeckPageBody/>
        </div>
    )
}

export default UserDecksPage;