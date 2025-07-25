import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "@/app/providers";
import SideBar from "@/components/UI/Sidebar/SideBar";
import MainContentWrapper from "@/components/MainContentWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FlashGen",
    description: "Automated AI Flashcards Creation",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-customDarkBg`}
        >
        <Providers>
            <SideBar/>
            <MainContentWrapper>
                {children}
            </MainContentWrapper>
        </Providers>
        </body>
        </html>
    );
}

