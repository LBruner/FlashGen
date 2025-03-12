"use client"

import React from "react";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(
    () => import("@/app/providers/ThemeProvider").then((mod) => mod.ThemeProvider),
    {ssr: false}
);

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    return <ThemeProvider>
        {children}
    </ThemeProvider>
}

export default Providers;