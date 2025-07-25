'use client';

import React from "react";

interface DashboardHeaderProps {
    title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({title}) => {
    return (
        <div className={'relative z-20 flex justify-between w-full items-start mb-8'}>
            <div className={'flex flex-col space-y-2'}>
                <div className={'relative inline-block'}>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                        {title}
                    </h1>
                    <div
                        className={'absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'}></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader;