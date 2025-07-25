import React, {useState} from "react";
import {
    IoAdd,
    IoBookOutline,
    IoLanguageOutline,
    IoRocketOutline,
    IoSchoolOutline,
    IoSparkles,
    IoTrendingUpOutline
} from "react-icons/io5";

const NoDecksEmptyState: React.FC = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <div
            className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-8 px-4 sm:px-8 lg:px-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-8">
                        <div className="relative">
                            <div
                                className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
                                <IoBookOutline size={28} className="text-white"/>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
                        Start Your Learning Journey
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium mb-8">
                        You don't have any flashcard decks yet. Let's create your first deck and begin building your knowledge base!
                    </p>
                    <button
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        <IoAdd size={24} className="animate-pulse"/>
                        <span className="relative">Create Your First Deck</span>
                        <IoSparkles size={20} className="animate-bounce"/>
                    </button>
                </div>
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Popular Deck Types
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
                        Get inspired by these common use cases
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deckSuggestions.map((suggestion, index) => {
                            const IconComponent = suggestion.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative cursor-pointer"
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div
                                        className={`absolute -inset-1 bg-gradient-to-r ${suggestion.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>

                                    <div
                                        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                                        <div className="flex items-center justify-center mb-4">
                                            <div
                                                className={`p-4 rounded-2xl bg-gradient-to-r ${suggestion.color} shadow-lg`}>
                                                <IconComponent size={32} className="text-white"/>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                                            {suggestion.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 text-center leading-relaxed">
                                            {suggestion.description}
                                        </p>

                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                Examples:
                                            </p>
                                            {suggestion.examples.map((example, exIndex) => (
                                                <div key={exIndex} className="flex items-center gap-2">
                                                    <div
                                                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${suggestion.color}`}></div>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        {example}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {hoveredCard === index && (
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                                <div
                                                    className={`w-8 h-1 rounded-full bg-gradient-to-r ${suggestion.color} animate-pulse`}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoDecksEmptyState;

const deckSuggestions = [
    {
        title: "Language Learning",
        description: "Perfect for vocabulary and phrases",
        icon: IoLanguageOutline,
        examples: ["English → Portuguese", "Spanish basics", "French conjugations"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Academic Studies",
        description: "Concepts, formulas, and definitions",
        icon: IoSchoolOutline,
        examples: ["Math formulas", "History dates", "Science terms"],
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Professional Skills",
        description: "Industry knowledge and certifications",
        icon: IoTrendingUpOutline,
        examples: ["Programming concepts", "Business terms", "Technical jargon"],
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "Personal Development",
        description: "Quotes, habits, and self-improvement",
        icon: IoRocketOutline,
        examples: ["Daily affirmations", "Life principles", "Book summaries"],
        color: "from-orange-500 to-red-500"
    }
];