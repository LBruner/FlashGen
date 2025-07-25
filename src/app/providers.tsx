"use client"

import React, {useEffect, useState} from "react";
import {ThemeProvider} from "next-themes";
import {HeroUIProvider} from "@heroui/react";
import {SidebarProvider} from "@/store/context/ui-context-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </>;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <HeroUIProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </HeroUIProvider>
        </ThemeProvider>
    );
};

export default Providers;