import React from "react";
import {Autocomplete, AutocompleteItem} from "@heroui/react";

interface UserDecksAutocompleteProps {
    userDecks: string[];
    selectedDeck: string;
    setSelectedDeck: (deck: string) => void;
}

const UserDecksAutocomplete: React.FC<UserDecksAutocompleteProps> = (props) => {
    const {userDecks, setSelectedDeck, selectedDeck} = props;
    return (
        <Autocomplete
            errorMessage={'Required field'}
            isRequired={true}
            color={'default'}
            selectedKey={userDecks.length === 0 ? 'Import cards (.csv file)' : selectedDeck}
            multiple={false}
            allowsCustomValue={true}
            defaultSelectedKey={userDecks.length === 0 ? 'Import cards (.csv file)' : userDecks[1]}
            onSelectionChange={(deck) => setSelectedDeck(deck?.toString() ?? '')}
        >
            {
                userDecks.map((deck) => (
                    <AutocompleteItem
                        textValue={deck}
                        key={deck}
                        classNames={{
                            base: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
                        }}
                    >
                        {deck}
                    </AutocompleteItem>
                ))
            }
        </Autocomplete>
    )
}

export default UserDecksAutocomplete;