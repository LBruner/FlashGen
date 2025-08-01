'use client';

import React from "react";
import {useTheme} from "next-themes";
import {IoMoon, IoSunny} from "react-icons/io5";

const ThemeButton: React.FC = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={'flex justify-center'}>
            {currentTheme == null &&
                <IoSunny
                    onClick={toggleTheme}
                    className={'hover:cursor-pointer text-gray-400'}
                    size={20}
                />
            }
            {currentTheme === 'light' && (
                <IoSunny
                    onClick={toggleTheme}
                    className={'hover:cursor-pointer text-gray-400'}
                    size={20}
                />
            )}
            {currentTheme === 'dark' && (
                <IoMoon
                    onClick={toggleTheme}
                    className={'hover:cursor-pointer text-gray-400'}
                    size={20}
                />
            )}
        </div>
    );
};

export default ThemeButton;