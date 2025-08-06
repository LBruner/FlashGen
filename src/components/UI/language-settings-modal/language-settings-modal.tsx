'use client';

import React from "react";
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
} from "@heroui/react";
import {AnkiDeck} from "@/models/anki/deck";
import {Notebook, X} from "lucide-react";
import {flashcardLanguages} from "@/lib/languages-list";
import CreateDeckPopover from "@/components/decks/create-deck-popover";
import CustomSolidButton from "@/components/UI/custom-solid-button";
import Link from "next/link";
import {pagePaths} from "@/path-routes";
import UserDecksAutocomplete from "@/components/decks/user-decks-autocomplete";

interface LanguageSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userDecks: AnkiDeck[];
    selectedDeck: AnkiDeck;
    setSelectedDeck: React.Dispatch<React.SetStateAction<AnkiDeck>>;
    inputLanguage: string;
    setInputLanguage: React.Dispatch<React.SetStateAction<string>>;
    setOutputLanguage: React.Dispatch<React.SetStateAction<string>>;
    outputLanguage: string;
    handleCreateFlashcards: () => void;
    createDeck: (deckName: string) => Promise<void>;
}

const LanguageSettingsModal: React.FC<LanguageSettingsModalProps> = (
    {
        isOpen,
        onClose,
        userDecks,
        selectedDeck,
        setSelectedDeck,
        handleCreateFlashcards,
        outputLanguage,
        inputLanguage,
        setOutputLanguage,
        setInputLanguage,
        createDeck
    }) => {

    return (
        <Modal isOpen={isOpen} backdrop={'blur'} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-gray-900 dark:text-white">
                    Flashcard Settings
                </ModalHeader>
                <ModalBody>
                    <div
                        className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-slate-700/50 shadow-2xl transition-colors duration-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                                    Configure Flashcards
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-200">
                                        Deck Name <span className={'text-xs text-gray-500'}>(Can change later)</span>
                                    </label>
                                    <div className="w-full h-full">
                                        <UserDecksAutocomplete userDecks={userDecks} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
                                    </div>
                                </div>
                                <div className={'flex gap-2 justify-between'}>
                                    <Link className={'flex-1'} href={pagePaths.getUserDecksPage()}>
                                        <CustomSolidButton text={'Manage Decks'} onClick={() => {
                                        }} icon={<Notebook/>}/>
                                    </Link>
                                    <div className={'flex-1'}>
                                        <CreateDeckPopover createDeck={createDeck} placement={'right'} offset={40}/>
                                    </div>
                                </div>
                                <Divider/>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-200">
                                        Input Language
                                    </label>
                                    <Select
                                        onSelectionChange={(language) => setInputLanguage(language.currentKey as string)}
                                        selectionMode={'single'}
                                        selectedKeys={[inputLanguage]}
                                    >
                                        {flashcardLanguages.map((language) => (
                                            <SelectItem
                                                textValue={language.name}
                                                key={language.code}
                                                classNames={{
                                                    base: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
                                                }}
                                            >
                                                <div>
                                                    <span
                                                        className="text-gray-900 dark:text-white">{language.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-200">
                                        Output Language
                                    </label>
                                    <Select
                                        onSelectionChange={(language) => setOutputLanguage(language.currentKey as string)}
                                        selectionMode={'single'}
                                        selectedKeys={[outputLanguage]}
                                    >
                                        {flashcardLanguages.map((language) => (
                                            <SelectItem
                                                textValue={language.name}
                                                key={language.code}
                                                classNames={{
                                                    base: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
                                                }}
                                            >
                                                <div>
                                                    <span
                                                        className="text-gray-900 dark:text-white">{language.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-8">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-white rounded-xl transition-all duration-200 font-medium border border-gray-200 dark:border-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onClose();
                                        handleCreateFlashcards();
                                    }}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                                >
                                    Fetch Cards
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter
                    className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 transition-colors duration-200">
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleCreateFlashcards}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default LanguageSettingsModal;