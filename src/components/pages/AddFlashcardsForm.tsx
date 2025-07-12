import React, {Dispatch, SetStateAction} from "react";
import LanguageSettingsModal from "@/components/UI/language-settings-modal/language-settings-modal";
import {Button, Divider} from "@heroui/react";
import TagInput from "@/components/UI/tag-input/TagInput";
import {Tag} from "react-tag-input";

interface AddFlashcardsScreenProps {
    selectedDeck: string;
    setSelectedDeck: Dispatch<SetStateAction<string>>;
    wordTags: Tag[];
    setWordTags: Dispatch<SetStateAction<Tag[]>>;
    inputLanguage: string;
    setInputLanguage: Dispatch<SetStateAction<string>>;
    outputLanguage: string;
    setOutputLanguage: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    onStartFlashcardCreation: () => void;
    userDecks: string[];
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    isAnkiConnected: boolean;
}

const AddFlashcardsForm: React.FC<AddFlashcardsScreenProps> = (
    props) => {

    return (
        <div className={'w-9/12'}>
            <LanguageSettingsModal {...props}/>
            <div className={'text-2xl font-semibold bg-neutral-800 px-6 py-6 rounded-t-lg'}>
                Create Anki Flashcards
            </div>
            <Divider/>
            <div className="flex flex-col gap-4 bg-neutral-800 p-6">
                <TagInput wordTags={props.wordTags} setWordTags={props.setWordTags}/>
                <Button
                    disabled={!props.isAnkiConnected}
                    onPress={props.onOpen}
                    className="w-full bg-blue-500 dark:bg-blue-800 dark:hover:bg-blue-900 text-white p-6 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    <p className={'text-lg'}>Create Flashcards</p>
                </Button>

            </div>
        </div>
    )
}

export default AddFlashcardsForm;