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
    ModalHeader,
    Select,
    SelectItem,
} from "@heroui/react";
import {AnkiDeck} from "@/models/anki/deck";
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
    onStartFlashcardCreation: () => void;
}

const LanguageSettingsModal: React.FC<LanguageSettingsModalProps> = (
    {
        isOpen,
        onClose,
        userDecks,
        selectedDeck,
        setSelectedDeck,
        onStartFlashcardCreation,
        outputLanguage,
        inputLanguage,
        setOutputLanguage,
        setInputLanguage
    }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Flashcard Settings</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-4 py-2 px-1 justify-between">
                        <div className={'flex gap-2'}>
                            <p>Nome do Deck</p>
                            <Autocomplete selectedKey={selectedDeck} multiple={false}
                                          onSelectionChange={(deck) => setSelectedDeck(deck!.toString())}>
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
                            <p>Idiomas</p>
                            <p>Entrada</p>
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
                            <p>Saída</p>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onPress={onStartFlashcardCreation}>
                        Criar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default LanguageSettingsModal;