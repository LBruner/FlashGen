'use client';

import React from "react";
import AnkiConnectionStatusBar from "@/components/anki-connection/AnkiConnectionStatusBar";
import useSWR from "swr";
import {ankiPaths} from "@/path-routes";
import axiosApi from "@/lib/AxiosApi";

const fetcher = (url: string) => axiosApi.get(url).then(res => res.data)

const DashboardHeader: React.FC = _ => {
    const {
        error: ankiConnectionError,
    } = useSWR(ankiPaths.getConnection(), fetcher, {refreshInterval: 1000})

    const isAnkiConnected = ankiConnectionError == null;

    return (
        <div className={'flex justify-between w-full items-center'}>
            <div className={'flex flex-col'}>
                <h1 className="text-2xl font-bold">Create Flashcards</h1>
                <p className={'text-gray-300'}>Add worlds and let AI generate your study cards</p>
            </div>
            <div>
                <AnkiConnectionStatusBar isConnected={isAnkiConnected}/>
            </div>
        </div>
    )
}

export default DashboardHeader;