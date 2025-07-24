import React from "react";
import {AddCardFeedbackResponseData} from "@/models/ApiResponse";
import {Check, Clock, Home, Library, Plus, Sparkles} from "lucide-react";
import Link from "next/link";
import {pagePaths} from "@/path-routes";

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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div
                    className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
                            <Check className="w-10 h-10 text-white" strokeWidth={3}/>
                        </div>
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
                            <button
                                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 dark:from-violet-600 dark:to-indigo-700 dark:hover:from-violet-700 dark:hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"/>
                                <Link href={pagePaths.getUserDecksPage()}>Create Another Deck</Link>
                            </button>

                            <button
                                className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 dark:border-slate-600 hover:border-violet-300 dark:hover:border-violet-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                <Library className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"/>
                                <Link href={pagePaths.getUserDecksPage()}>View All Decks</Link>
                            </button>
                        </div>

                        <button onClick={resetPageData}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-slate-700 dark:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 text-gray-700 dark:text-gray-200 font-medium py-3 px-6 rounded-xl transition-all duration-300 group">
                            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"/>
                           Back to Home
                        </button>
                    </div>

                    <div
                        className="text-center mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            💡 <strong>Pro tip:</strong> Your cards are automatically saved and ready for review. Start
                            studying now to maximize retention!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlashcardsResults;