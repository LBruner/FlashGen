'use client';

import React from "react";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Select, SelectItem,
} from "@heroui/react";
import {AnkiDeck} from "@/models/anki/deck";
import {X} from "lucide-react";
import {flashcardLanguages} from "@/lib/languages-list";

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
        setInputLanguage
    }) => {

    return (
        <Modal isOpen={isOpen} backdrop={'blur'} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Flashcard Settings</ModalHeader>
                <ModalBody>
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700/50">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Configure Flashcards</h3>
                                <button
                                    onClick={onClose}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300">
                                        Anki Deck Name
                                    </label>
                                    <Autocomplete errorMessage={'Campo obrigatório'} isRequired={true} color={'default'} selectedKey={selectedDeck} multiple={false}
                                                  onSelectionChange={(deck) => setSelectedDeck(deck?.toString() ?? '')}>
                                        {
                                            userDecks.map((deck) => (
                                                <AutocompleteItem textValue={deck} key={deck}>
                                                    {deck}
                                                </AutocompleteItem>
                                            ))
                                        }
                                    </Autocomplete>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Input Language
                                    </label>
                                    <Select
                                        onSelectionChange={(language) => setInputLanguage(language.currentKey as string)}
                                        selectionMode={'single'} selectedKeys={[inputLanguage]}>
                                        {flashcardLanguages.map((language) => (
                                            <SelectItem textValue={language.name} key={language.code}>
                                                <div>
                                                    <span>{language.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Output Language
                                    </label>
                                    <Select
                                        onSelectionChange={(language) => setOutputLanguage(language.currentKey as string)}
                                        selectionMode={'single'} selectedKeys={[outputLanguage]}>
                                        {flashcardLanguages.map((language) => (
                                            <SelectItem textValue={language.name} key={language.code}>
                                                <div>
                                                    <span>{language.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateFlashcards}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all font-medium"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onPress={handleCreateFlashcards}>
                        Criar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default LanguageSettingsModal;