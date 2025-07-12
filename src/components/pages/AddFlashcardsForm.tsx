import React, {Dispatch, SetStateAction} from "react";
import LanguageSettingsModal from "@/components/UI/language-settings-modal/language-settings-modal";
import TagInput from "@/components/UI/tag-input/TagInput";
import {IoGlobeOutline} from "react-icons/io5";

interface AddFlashcardsScreenProps {
    selectedDeck: string;
    setSelectedDeck: Dispatch<SetStateAction<string>>;
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
    inputLanguage: string;
    setInputLanguage: Dispatch<SetStateAction<string>>;
    outputLanguage: string;
    setOutputLanguage: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    handleCreateFlashcards: () => void;
    userDecks: string[];
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    isAnkiConnected: boolean;
}

const AddFlashcardsForm: React.FC<AddFlashcardsScreenProps> = (
    props) => {

    return (
        <div className={'w-full mt-64 flex flex-col justify-center items-center gap-4'}>
            <LanguageSettingsModal {...props}/>
            <div className={'w-6/12 flex flex-col gap-2'}>
                <div className={'flex justify-center'}>
                    <div className={'p-4 rounded-xl bg-red-200 '}>
                        <IoGlobeOutline size={30}/>
                    </div>
                </div>
                <div className={'flex flex-col items-center gap-2'}>
                    <p className={'text-2xl font-semibold'}> Add Words to Study</p>
                    <p className={'text-gray-400'}>Type words and press Enter to add them to your flashcard deck</p>
                </div>
                <div className=" gap-4 bg-neutral-800 p-6">
                    <TagInput tags={props.tags} setTags={props.setTags}/>
                    <button
                        onClick={props.onOpen}
                        disabled={props.tags.length === 0}
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                            props.tags.length > 0
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                                : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        Create Flashcards ({props.tags.length} words)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddFlashcardsForm;