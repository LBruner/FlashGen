'use client';

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface sidebarButtonProps {
    title?: string;
    icon: React.ReactNode;
    path: string;
    onClick?: () => void;
}

const SidebarNavButton: React.FC<sidebarButtonProps> = (props) => {
    const {title, icon, path, onClick} = props;

    const pathName = usePathname();
    const isActive = pathName.includes(path);

    const isMinimized = title == null;

    return (
        <Link onClick={onClick} href={path} className={'w-full'}>
            <div
                className={`${isActive ? 'bg-gradient-to-r from-customSidebarItemLeftGradientDarkBg from-50% to-blue-950 border border-gray-700' : ''} rounded-xl border-transparent border hover:border-gray-600 py-3 gap-2  flex items-center ${isMinimized ? 'px-3' : 'mx-4 px-6'}`}>
                <div className={`${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-200`}>
                    {icon}
                </div>
                {title &&
                    <p className={`${isActive ? 'text-white' : 'text-gray-400'} hover:text-gray-200  font-semibold text-lg`}>{title}</p>}
            </div>
        </Link>
    )
}

export default SidebarNavButton;