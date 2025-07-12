'use client';

import React, {useState} from "react";
import {useTheme} from "next-themes";
import {IoBookOutline, IoSettingsOutline} from "react-icons/io5";
import {FiHome} from "react-icons/fi";
import SidebarNavButton from "@/components/UI/Sidebar/SidebarNavButton";
import {pagePaths} from "@/path-routes";
import {RiExpandLeftLine, RiExpandRightLine} from "react-icons/ri";
import ThemeButton from "@/components/UI/Sidebar/ThemeButton";

const SideBar: React.FC = _ => {

    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

    if (isSidebarMinimized)
        return (
            <div className={'bg-customSidebarDarkBg py-4 w-16 h-screen flex flex-col items-center justify-between'}>
                <div>
                    <div className={'flex flex-col items-center justify-center'}>
                        <button onClick={setIsSidebarMinimized.bind(null, false)} className={'p-2'}>
                            <RiExpandRightLine className={'text-gray-400 hover:text-gray-200'} size={30}/>
                        </button>
                    </div>
                    <div className={'mt-4 flex flex-col gap-4'}>
                        <SidebarNavButton path={pagePaths.getHomePage()}
                                          icon={<FiHome
                                              size={20}/>}/>
                        <SidebarNavButton path={pagePaths.getUserDecksPage()}
                                          icon={<IoBookOutline size={20}/>}/>
                        <SidebarNavButton path={pagePaths.getSettingsPage()}
                                          icon={<IoSettingsOutline size={20}/>}/>
                        <ThemeButton/>
                    </div>
                </div>
                <button
                    className={'bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-300 p-3 rounded-xl'}>
                    <IoBookOutline className={'text-white'} size={24}/>
                </button>
            </div>
        );

    return (
        <>
            <div className={'bg-customSidebarDarkBg w-72 h-screen flex flex-col'}>
                <div className={'flex border-b border-b-gray-400 dark:border-b-gray-600 items-center justify-between'}>
                    <div className={'flex py-6 gap-4 pl-4'}>
                        <button
                            className={'bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-300 p-3 rounded-xl'}>
                            <IoBookOutline className={'text-white'} size={24}/>
                        </button>
                        <div>
                            <p className={'text-xl font-bold text-white'}>FlashGen</p>
                            <p className={'text-gray-400'}>Smart Flashcards</p>
                        </div>
                    </div>
                    <button onClick={setIsSidebarMinimized.bind(null, true)} className={'mr-6'}>
                        <RiExpandLeftLine className={'text-gray-300'} size={24}/>
                    </button>
                </div>
                <div className={'mt-4 flex flex-col gap-4'}>
                    <SidebarNavButton path={pagePaths.getHomePage()} title={'Dashboard'}
                                      icon={<FiHome size={20}/>}/>
                    <SidebarNavButton path={pagePaths.getUserDecksPage()} title={'My Decks'}
                                      icon={<IoBookOutline size={20}/>}/>
                    <SidebarNavButton onClick={toggleTheme} path={'#'} title={'Page Theme'}
                                      icon={<ThemeButton/>}/>
                    <SidebarNavButton path={pagePaths.getSettingsPage()} title={'Settings'}
                                      icon={<IoSettingsOutline size={20}/>}/>
                </div>
            </div>
        </>
    );
}

export default SideBar;