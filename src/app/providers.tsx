"use client"

import React from "react";
import {ThemeProvider} from "@/app/providers/ThemeProvider";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    return <ThemeProvider>
        {children}
    </ThemeProvider>
}

export default Providers;