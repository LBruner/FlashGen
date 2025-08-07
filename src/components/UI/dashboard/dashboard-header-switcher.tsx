import React from 'react';
import DashboardHeader from "@/components/UI/dashboard/dashboard-header";

interface ScreenHeaderSwitcherProps{
    currentScreenIndex: number
}

const ScreenHeaderSwitcher: React.FC<ScreenHeaderSwitcherProps> = ({ currentScreenIndex }) => {
    const renderHeader = () => {
        switch (currentScreenIndex) {
            case 0:
                return (
                    <DashboardHeader title="Create Flashcards" />
                );

            case 1:
                return (
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col w-full justify-start items-start">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                🎯 Review Your Flashcards
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-200">
                                Select meanings and edit content before creating your cards
                            </p>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col w-full justify-start items-start">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                🚀 Success!
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-200">
                                Your flashcards are ready
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {renderHeader()}
        </div>
    );
};

export default ScreenHeaderSwitcher;