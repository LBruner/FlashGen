'use client';

import React, {useState} from "react";
import {Plus, X} from "lucide-react";

interface CreateFlashcardsPageProps {
    tags: Array<string>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateFlashcardsPage: React.FC<CreateFlashcardsPageProps> = ({tags, setTags,}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag: string) => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTag();
        }
    };

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter a word..."
                        className="flex-1 px-4 py-3 bg-slate-50 border text-black border-slate-600/50 rounded-xl dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    <button
                        onClick={handleAddTag}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-medium"
                    >
                        <Plus className="w-5 h-5"/>
                    </button>
                </div>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, index) => (
                            <div key={index}
                                 className="flex items-center space-x-2 dark:bg-indigo-950 bg-gray-100 px-3 py-2 rounded-lg border border-slate-600/50">
                                <span className="dark:text-white text-sm">{tag}</span>
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-slate-400 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-4 h-4"/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateFlashcardsPage;