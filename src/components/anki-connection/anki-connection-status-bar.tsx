"use client";
import React from "react";

interface AnkiConnectionStatusCardProps {
    isConnected: boolean;
}


const AnkiConnectionStatusBar: React.FC<AnkiConnectionStatusCardProps> = (
    {
        isConnected,
    }) => {

    const connectedDiv = (
        <div className={'flex gap-2'}>
            <p>🟢</p>
            <p>Anki Connected</p>
        </div>
    );

    const disconnectedDiv = (
        <div className={'flex gap-2'}>
            <p>🟡</p>
            <p>Connecting to Anki</p>
        </div>
    );

    return (
        <div className='flex flex-col'>
            {isConnected ? connectedDiv : disconnectedDiv}
        </div>
    );
};

export default AnkiConnectionStatusBar;
