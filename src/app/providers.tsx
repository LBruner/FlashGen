"use client"

import React from "react";
import {ThemeProvider} from "next-themes";
import {HeroUIProvider} from "@heroui/react";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </ThemeProvider>
    );
};

export default Providers;