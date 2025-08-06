import React, {Dispatch} from "react";
import {BarChart3, BookOpen, CheckCircle, FileText} from "lucide-react";

interface FlashcardStepProps {
    showFlashcardReviewPage: boolean;
    showFeedbackPage: boolean;
    currentScreenIndex: number;
    setCurrentScreen: Dispatch<number>;
}

const FlashcardSteps: React.FC<FlashcardStepProps> = (
    {
        showFlashcardReviewPage,
        showFeedbackPage,
        currentScreenIndex,
        setCurrentScreen,
    }) => {

    const steps = [
        {
            id: 0,
            title: 'Words Form',
            icon: FileText,
            isDisabled: false,
        },
        {
            id: 1,
            title: 'Flashcard Review',
            icon: BookOpen,
            isDisabled: !showFlashcardReviewPage,
        },
        {
            id: 2,
            title: 'Feedback Results',
            icon: BarChart3,
            isDisabled: !showFeedbackPage,
        }
    ];

    return (
        <div className="w-8/12 py-4">

            <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentScreenIndex === index;
                    const isCompleted = currentScreenIndex >= index;
                    const isDisabled = step.isDisabled;

                    return (
                        <div key={step.id} className="flex-1">
                            <div className="flex flex-col items-center">
                                <button
                                    disabled={isDisabled}
                                    onClick={() => !isDisabled && setCurrentScreen(index)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                                        isDisabled
                                            ? 'bg-gray-100 dark:bg-slate-800/50 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                                            : isActive
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : isCompleted
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400 hover:bg-gray-300 dark:hover:bg-slate-600'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="w-6 h-6"/>
                                    ) : (
                                        <Icon className={`w-6 h-6 ${isDisabled ? 'opacity-50' : ''}`}/>
                                    )}
                                </button>
                                <div className="text-center">
                                    <div className={`font-medium text-sm ${
                                        isDisabled
                                            ? 'text-gray-400 dark:text-slate-600'
                                            : isActive
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-slate-300'
                                    }`}>
                                        {step.title}
                                    </div>
                                </div>
                            </div>
                                <div className={`h-0.5 mt-6 mx-4 ${
                                    isCompleted ? 'bg-green-600' : 'bg-gray-300 dark:bg-slate-600'
                                }`}/>

                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default FlashcardSteps;