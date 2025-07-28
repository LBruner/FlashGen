'use client';

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Tooltip} from "@heroui/react";

interface sidebarButtonProps {
    title: string;
    icon: React.ReactNode;
    path: string;
    onClick?: () => void;
    isSidebarMinimized: boolean;
}

const SidebarNavButton: React.FC<sidebarButtonProps> = (props) => {
    const {title, icon, path, onClick, isSidebarMinimized} = props;

    const pathName = usePathname();
    const isActive = pathName.includes(path);

    return (
        <Tooltip isDisabled={!isSidebarMinimized} content={title} color={'default'} placement={'right'}>
            <Link onClick={onClick} href={path} className={'w-full'}>
                <div
                    className={`${isActive ? 'bg-gradient-to-r from-customSidebarItemLeftGradientDarkBg from-50% to-blue-950 border border-gray-700' : ''} 
                rounded-xl border-transparent border hover:border-gray-600 py-3 gap-2 flex items-center transition-all duration-300 ease-in-out
                ${isSidebarMinimized ? 'px-3 mx-2' : 'mx-4 px-6'}`}>

                    <div
                        className={`${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-200 transition-colors duration-200`}>
                        {icon}
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        title ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0'
                    }`}>
                        {!isSidebarMinimized && (
                            <p className={`${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-200 font-semibold text-lg whitespace-nowrap transition-colors duration-200`}>
                                {title}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </Tooltip>
    )
}

export default SidebarNavButton;