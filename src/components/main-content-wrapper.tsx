'use client';
import React from 'react';
import {useSidebar} from "@/store/context/ui-context-provider";

const MainContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { sidebarWidth } = useSidebar();
    const widthInRem = sidebarWidth === '16' ? '4rem' : '18rem';

    return (
        <main
            className="flex-1 transition-all duration-300 ease-soft-spring"
            style={{
                marginLeft: widthInRem
            }}
        >
            {children}
        </main>
    );
};
export default MainContentWrapper;