import React, {useState} from "react";
import {Button, Popover, PopoverContent, PopoverTrigger,} from "@heroui/react";
import {Layers, X} from "lucide-react";
import {OverlayPlacement} from "@heroui/aria-utils";
import CustomSolidButton from "@/components/UI/custom-solid-button";
import UserDecksAutocomplete from "@/components/decks/user-decks-autocomplete";

interface FlashcardsSettingsPopoverProps {
    offset?: number;
    placement?: OverlayPlacement;
    userDecks: string[];
    selectedDeck: string;
    setSelectedDeck: (deck: string) => void;
}

const FlashcardsSettingsPopover: React.FC<FlashcardsSettingsPopoverProps> = (
    {
        offset,
        placement,
        setSelectedDeck,
        selectedDeck,
        userDecks
    }) => {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(selectedDeck);

    return (
        <Popover onOpenChange={(open) => setIsPopoverOpen(open)} isOpen={isPopoverOpen} backdrop={'transparent'}
                 showArrow offset={offset} placement={placement}>
            <PopoverTrigger>
                <CustomSolidButton text={'Sync Settings'} onClick={() => {
                }} icon={<p>⚙️</p>}/>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                {(_) => (
                    <div className="p-4 w-full flex flex-col gap-4">
                        <div className={'flex gap-2'}>
                            <div
                                className={'h-auto flex items-center p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl '}>
                                <Layers size={28} color={'blue'}/>
                            </div>
                            <div>
                                <p className={'font-bold text-xl'}>Sync Settings</p>
                                <p className={'text-gray-500 text-lg'}>Set the synchronization settings</p>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setIsPopoverOpen(false);
                                }}><X/></button>
                            </div>
                        </div>
                        <div className={'pt-2'}>
                            <p className={'pl-2 pb-2'}>Anki Deck</p>
                            <UserDecksAutocomplete userDecks={userDecks} selectedDeck={currentSelected}
                                                   setSelectedDeck={setCurrentSelected}/>
                        </div>
                        <div className={'flex gap-2'}>
                            <Button onPress={() => {
                                setIsPopoverOpen(false);
                            }} className={'flex-1'} variant={'ghost'}>Cancel</Button>
                            <Button onPress={() => {
                                setSelectedDeck(currentSelected);
                                setIsPopoverOpen(false);
                            }
                            } className={'flex-1 font-bold bg-blue-600 text-white'}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default FlashcardsSettingsPopover;