import React from "react";
import UserDeckPageBody from "@/components/decks/user-deck-page-body";
import {ToastContainer} from "react-toastify";

const UserDecksPage: React.FC = async () => {
    return (
        <div className={'w-full'}>
            <ToastContainer limit={1} className="mt-16"/>
            <UserDeckPageBody/>
        </div>
    )
}

export default UserDecksPage;