import React from "react";
import {AddCardFeedbackResponseData} from "@/models/api-response";
import {Clock, Info, Plus, Sparkles} from "lucide-react";
import Link from "next/link";

interface FlashcardsResultsProps {
    responseData: AddCardFeedbackResponseData;
    resetPageData: () => void;
}

const FlashcardsResults: React.FC<FlashcardsResultsProps> = (
    {
        responseData,
        resetPageData
    }: FlashcardsResultsProps) => {
    const {deckName, executionTime, addedCards} = responseData;

    return (
        <div>
            <div className="mt-5 mx-auto px-4">
                <div className="mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
                            Cards Created Successfully!
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Your flashcards are ready for studying
                        </p>
                    </div>

                    <div
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-violet-500 dark:text-violet-400"/>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Creation Summary</h2>
                        </div>

                        <div className="space-y-6">
                            <div
                                className="flex items-start gap-4 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/30 dark:to-indigo-900/30 rounded-2xl border-l-4 border-violet-400 dark:border-violet-500">
                                <div
                                    className="flex-shrink-0 w-3 h-3 bg-violet-400 dark:bg-violet-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Deck
                                        Name</p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{deckName}</p>
                                </div>
                            </div>
                            <div
                                className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl border-l-4 border-emerald-400 dark:border-emerald-500">
                                <div
                                    className="flex-shrink-0 w-3 h-3 bg-emerald-400 dark:bg-emerald-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Cards
                                        Created</p>
                                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{addedCards}</p>
                                </div>
                            </div>

                            <div
                                className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl border-l-4 border-amber-400 dark:border-amber-500">
                                <Clock className="flex-shrink-0 w-5 h-5 text-amber-500 dark:text-amber-400 mt-1"/>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Processing
                                        Time</p>
                                    <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">{executionTime.toFixed(1)} seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <CustomLinkButton onClick={resetPageData}
                                className={'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'}
                                title={'Add More Cards'} path={'#'} icon={<Plus
                                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"/>
                            }/>
                            <CustomLinkButton
                                className={'bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 dark:from-violet-600 dark:to-indigo-700 dark:hover:from-violet-700 dark:hover:to-indigo-800'}
                                title={'View Anki Importing Guide'} path={'app-guide'} icon={<Info
                                className="w-5 h-5  transition-transform duration-300"/>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CustomButtonProps {
    title: string,
    path: string;
    icon: React.ReactNode;
    className: string;
    onClick?: () => void;
}

const CustomLinkButton: React.FC<CustomButtonProps> = ({onClick, title, path, icon, className}) => {
    return <button onClick={onClick}
                   className={`group flex items-center justify-center gap-3 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${className}`}>
        {icon}
        <Link href={path}>{title}</Link>
    </button>;
}

export default FlashcardsResults;