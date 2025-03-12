'use client';

import React from "react";
import {Navbar, NavbarContent, NavbarItem} from "@heroui/react";
import {useTheme} from "next-themes";
import {FaRegMoon, FaRegSun} from "react-icons/fa6";

const SideBar: React.FC = _ => {

    const {theme, setTheme} = useTheme();

    return (
        <>
            <Navbar
                className="h-screen fixed w-52 flex-col items-start justify-start p-4 bg-gray-100 dark:bg-customDarkNav"
            >
                <NavbarContent className="flex-col items-start gap-4 w-full">
                    <NavbarItem>
                        <div className={'flex gap-4 hover:bg-gray-200 px-4 py-2 rounded-lg w-full'}>
                            <p>Toogle Theme</p>
                            <button onClick={() => theme == 'light' ? setTheme('dark') : setTheme('light')}>
                                {theme == 'light' ? <FaRegSun size={20}/> :
                                    <FaRegMoon size={20}/>}
                            </button>
                        </div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className={'ml-32'}>

            </div>
        </>
    );

}

export default SideBar;