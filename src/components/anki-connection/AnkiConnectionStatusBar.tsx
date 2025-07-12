"use client";
import React from "react";

interface AnkiConnectionStatusCardProps {
    isConnected: boolean;
}


const AnkiConnectionStatusBar: React.FC<AnkiConnectionStatusCardProps> = (
    {
        isConnected,
    }) => {

    return (
        <div className="fixed bottom-0 left-0 py-2 bg-blue-400 w-full text-center text-white font-medium">
            {isConnected
                ? "✅ Conectado ao Anki"
                : "⏳ Tentando conexão com API do Anki..."}
        </div>
    );
};

export default AnkiConnectionStatusBar;
