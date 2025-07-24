import React from "react";

interface DecksSummaryItemProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const DecksSummaryItem: React.FC<DecksSummaryItemProps> = (props) => {
    const {color, value, title, icon} = props;
    return (
        <div className={'flex px-6 py-4 items-center justify-between bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'}>
            <div>
                <p className={'text-lg text-gray-600 dark:text-gray-400'}>{title}</p>
                <p className={'text-xl font-bold text-gray-900 dark:text-white'}>{value}</p>
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                {icon}
            </div>
        </div>
    )
}

export default DecksSummaryItem;