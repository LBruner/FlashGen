'use client';

import React from "react";
import {SEPARATORS, Tag, WithContext as ReactTags} from "react-tag-input";

interface CreateFlashcardsPageProps {
    wordTags: Array<Tag>;
    setWordTags:  React. Dispatch<React.SetStateAction<Tag[]>>;
}

const CreateFlashcardsPage: React.FC<CreateFlashcardsPageProps> = ({wordTags, setWordTags,}) => {

    const handleDelete = (index: number) => {
        setWordTags(wordTags.filter((_, i) => i !== index));
    };

    const onTagUpdate = (index: number, newTag: Tag) => {
        const updatedTags = [...wordTags];
        updatedTags.splice(index, 1, newTag);
        setWordTags(updatedTags);
    };

    const handleAddition = (tag: Tag) => {
        setWordTags((prevTags) => [...prevTags, tag]);
    };

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = wordTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setWordTags(newTags);
    };

    const handleTagClick = (index: number) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const onClearAll = () => {
        setWordTags([]);
    };

    return (
        <div className={'mt-32'}>
            <ReactTags
                autoFocus={true}
                classNames={{
                    tags: 'flex flex-wrap items-center gap-2 p-2 w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all',
                    tagInput: 'flex-1 min-w-[120px]',
                    tagInputField: 'w-full px-3 py-1.5 border-none focus:outline-none bg-transparent placeholder-gray-400',
                    selected: 'flex flex-wrap items-center gap-2 w-full',
                    tag: 'flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm',
                    remove: 'ml-1.5 text-white hover:text-blue-200 text-xs cursor-pointer',
                }}
                tags={wordTags}
                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                onTagUpdate={onTagUpdate}
                inputFieldPosition="inline"
                editable
                placeholder="Palavras..."
                allowUnique
                allowDragDrop={false}
            />
        </div>
    )
}

export default CreateFlashcardsPage;