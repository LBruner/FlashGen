import FlashcardCardList from "../flashcards-card/flashcards-cards-list";
import {Flashcard} from "@/models/flashcard";
import React, {Dispatch, SetStateAction} from "react";
import CustomSolidButton from "@/components/UI/custom-solid-button";
import {GrDocumentCsv} from "react-icons/gr";
import {useAppSettings} from "@/store/context/settings-context-provider";
import {AnkiDeck} from "@/models/anki/deck";
import FlashcardsSettingsPopover from "@/components/flashcards/flashcards-settings-popover";
import {Tooltip} from "@heroui/react";

interface FlashCardResultsProps {
    flashcards: Flashcard[];
    setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
    addFlashcardsToAnki: () => void;
    importFlashcardsToFile: (flashcards: Flashcard[]) => void;
    userDecks: AnkiDeck[];
    selectedDeck: string;
    setSelectedDeck: Dispatch<SetStateAction<string>>;
}

const FlashcardsReview: React.FC<FlashCardResultsProps> = (
    {
        flashcards,
        setFlashcards,
        addFlashcardsToAnki,
        selectedDeck,
        importFlashcardsToFile,
        userDecks,
        setSelectedDeck
    }) => {

    const {isAnkiConnected} = useAppSettings();

    const hasNoCardsToAdd = flashcards.every((card) => card.selectedMeaningIndex.length == 0);

    const flashcardsReady = flashcards.reduce((acc, flashcard) => acc + flashcard.selectedMeaningIndex.length, 0);

    const selectAllMeanings = () => {
        const newFlashcards = [...flashcards];
        newFlashcards.forEach((card) => {
            card.selectedMeaningIndex = card.meanings.map((_, i) => i);
            return card;
        });

        setFlashcards(newFlashcards);
    }

    const cannotSyncFlashcards = hasNoCardsToAdd || selectedDeck == userDecks[0];

    return (
        <div className={'w-full h-auto gap-8 py-8 flex flex-col mx-12'}>
            <div className={'flex flex-col w-full justify-start items-start'}>
                <p className={'text-3xl font-bold'}>🎯 Review Your Flashcards</p>
                <p className={'text-lg light:text-gray-500 dark:text-gray-200'}>Select meanings and edit content before
                    creating your cards</p>
            </div>
            <div className={'flex flex-col gap-8 items-center justify-center'}>
                <div
                    className={'w-full flex flex-col items-center justify-center rounded-lg py-4 gap-4 dark:bg-slate-50/5 bg-gray-100 border dark:border-transparent'}>
                    <p className={'text-xl'}>Ready to create <span
                        className={'font-bold'}>{flashcardsReady}</span> flashcards on deck: <span
                        className={'font-semibold'}>{selectedDeck}</span></p>
                    <div className={'flex gap-4'}>
                        <button
                            className={'px-4 border-gray-500 dark:border-transparent py-2 bg-slate-50/10 border rounded-lg font-semibold text-lg'}
                            onClick={selectAllMeanings}>
                            📋 Select All
                        </button>
                        <FlashcardsSettingsPopover userDecks={userDecks} selectedDeck={selectedDeck}
                                                   setSelectedDeck={setSelectedDeck}/>
                        {isAnkiConnected && selectedDeck != '' &&
                            <Tooltip isDisabled={!cannotSyncFlashcards} color={'danger'} content={!cannotSyncFlashcards ?  '' : hasNoCardsToAdd ? 'Pick at least one meaning' : 'Please, pick another deck to sync flashcards to'}>
                                <CustomSolidButton disabled={cannotSyncFlashcards}
                                                   className={''} text={'Sync to Anki'} onClick={addFlashcardsToAnki}
                                                   icon={<p>🚀</p>}
                                />
                            </Tooltip>
                        }
                        <CustomSolidButton text={'Export to file'} onClick={() => {
                            importFlashcardsToFile(flashcards)
                        }} icon={<GrDocumentCsv className={'text-green-700'}/>}
                        />
                    </div>
                </div>
                <FlashcardCardList
                    flashcards={flashcards}
                    setFlashcards={setFlashcards}
                />
            </div>
        </div>
    );
};

export default FlashcardsReview;
