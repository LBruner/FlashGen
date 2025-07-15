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
        <div className={'flex px-6 py-4 items-center justify-between bg-gray-700 rounded-xl'}>
            <div>
                <p className={'text-lg text-gray-400'}>{title}</p>
                <p className={'text-xl font-bold'}>{value}</p>
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                {icon}
            </div>
        </div>
    )
}

export default DecksSummaryItem;