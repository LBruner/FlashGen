'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
    isSidebarMinimized: boolean;
    setIsSidebarMinimized: (minimized: boolean) => void;
    sidebarWidth: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const sidebarWidth = isSidebarMinimized ? '16' : '72';

    return (
        <SidebarContext.Provider value={{ isSidebarMinimized, setIsSidebarMinimized, sidebarWidth }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};