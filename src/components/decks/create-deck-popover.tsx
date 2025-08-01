import React, {useState} from "react";
import {Button, Popover, PopoverContent, PopoverTrigger,} from "@heroui/react";
import {Layers, Plus, X} from "lucide-react";
import {Input} from "@heroui/input";
import {OverlayPlacement} from "@heroui/aria-utils";
import CustomSolidButton from "@/components/UI/custom-solid-button";

interface CreateDeckPopoverProps {
    createDeck: (deckName: string) => Promise<void>;
    offset?: number;
    placement?: OverlayPlacement;
}

const CreateDeckPopover: React.FC<CreateDeckPopoverProps> = ({createDeck, offset, placement}) => {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [newDeckName, setNewDeckName] = React.useState('');

    return (
        <Popover onOpenChange={(open) => setIsPopoverOpen(open)} isOpen={isPopoverOpen} backdrop={'transparent'} showArrow offset={offset} placement={placement}>
            <PopoverTrigger>
                <CustomSolidButton text={'Create Deck'} onClick={() => {
                }} icon={<Plus/>}/>
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
                                <p className={'font-bold text-xl'}>Create New Deck</p>
                                <p className={'text-gray-500 text-lg'}>Organize your content into a new deck</p>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setIsPopoverOpen(false);
                                }}><X/></button>
                            </div>
                        </div>
                        <div>
                            <Input value={newDeckName} onValueChange={setNewDeckName} label={'Deck Name'} isRequired={true} labelPlacement={'inside'}/>
                        </div>
                        <div className={'flex gap-2'}>
                            <Button onPress={() => {
                                setIsPopoverOpen(false);
                            }} className={'flex-1'} variant={'ghost'}>Cancel</Button>
                            <Button onPress={() =>{ createDeck(newDeckName).then(() => setIsPopoverOpen(false)); setNewDeckName('')}} className={'flex-1 font-bold bg-blue-600 text-white'}>
                                + Create Deck
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default CreateDeckPopover;