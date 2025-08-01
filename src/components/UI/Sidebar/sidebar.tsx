'use client';

import React from "react";
import {useTheme} from "next-themes";
import {IoBookOutline, IoSettingsOutline} from "react-icons/io5";
import {FiHome} from "react-icons/fi";
import SidebarNavButton from "@/components/UI/Sidebar/sidebar-nav-button";
import {pagePaths} from "@/path-routes";
import {RiExpandLeftLine, RiExpandRightLine} from "react-icons/ri";
import ThemeButton from "@/components/UI/Sidebar/theme-button";
import {useSidebar} from "@/store/context/ui-context-provider";
import {MdInfoOutline} from "react-icons/md";

const Sidebar: React.FC = () => {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    const {isSidebarMinimized, setIsSidebarMinimized} = useSidebar();

    return (
        <div
            className={`bg-customSidebarDarkBg fixed h-screen flex flex-col transition-all duration-300 ease-soft-spring ${
                isSidebarMinimized ? 'w-16' : 'w-72'
            }`}>
            <div
                className={'flex border-b border-b-gray-400 dark:border-b-gray-600 items-center justify-between overflow-hidden'}>
                <div className={`flex py-6 gap-4  items-center min-w-0 ${!isSidebarMinimized && 'pl-4'}`}>
                    {!isSidebarMinimized &&
                        <button
                            className={'bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-300 p-3 rounded-xl flex-shrink-0'}>
                            <IoBookOutline className={'text-white'} size={24}/>
                        </button>}
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isSidebarMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    }`}>
                        <div className={'whitespace-nowrap'}>
                            <p className={'text-xl font-bold text-white'}>FlashGen</p>
                            <p className={'text-gray-400'}>Smart Flashcards</p>
                        </div>
                    </div>
                </div>

                <div
                    className={`transition-all duration-300 ease-in-out flex justify-center ${isSidebarMinimized ? 'w-full' : 'pr-6'}`}>
                    <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className={'p-2'}>
                        {isSidebarMinimized ? (
                            <RiExpandRightLine className={'text-gray-400 hover:text-gray-200'} size={24}/>
                        ) : (
                            <RiExpandLeftLine className={'text-gray-300 hover:text-gray-200'} size={24}/>
                        )}
                    </button>
                </div>
            </div>

            <div className={'mt-4 flex flex-col gap-4 flex-1'}>
                <SidebarNavButton
                    path={pagePaths.getHomePage()}
                    title={'Dashboard'}
                    icon={<FiHome size={20}/>}
                    isSidebarMinimized={isSidebarMinimized}
                />
                <SidebarNavButton
                    path={pagePaths.getUserDecksPage()}
                    title={'User Decks'}
                    icon={<IoBookOutline size={20}/>}
                    isSidebarMinimized={isSidebarMinimized}
                />
                <SidebarNavButton
                    path={pagePaths.getAppGuidePage()}
                    title={'Troubleshoot'}
                    icon={<MdInfoOutline size={20}/>}
                    isSidebarMinimized={isSidebarMinimized}
                />
                <SidebarNavButton
                    onClick={toggleTheme}
                    path={'#'}
                    title={'Page Theme'}
                    icon={<ThemeButton/>}
                    isSidebarMinimized={isSidebarMinimized}

                />
                <SidebarNavButton
                    path={pagePaths.getSettingsPage()}
                    title={'Settings'}
                    icon={<IoSettingsOutline size={20}/>}
                    isSidebarMinimized={isSidebarMinimized}
                />
            </div>

            {isSidebarMinimized &&
                <div className={'pb-4 flex justify-center'}>
                    <button
                        className={'bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-300 p-3 rounded-xl'}>
                        <IoBookOutline className={'text-white'} size={24}/>
                    </button>
                </div>
            }
        </div>
    );
}

export default Sidebar;