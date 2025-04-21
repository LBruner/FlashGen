"use client";
import {useEffect} from "react";

const checkAnkiAPI = async () => {
  try {
    const response = await fetch("/api/anki-connection");
    return response.ok;
  } catch {
    return false;
  }
};

interface AnkiConnectionStatusCardProps {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnkiConnectionStatusCard: React.FC<AnkiConnectionStatusCardProps> = ({
  isConnected,
  setIsConnected,
}) => {
  useEffect(() => {
    const checkImmediately = async () => {
      const connected = await checkAnkiAPI();
      setIsConnected(connected);
    };

    checkImmediately();

    const interval = setInterval(async () => {
      if (!isConnected) {
        const connected = await checkAnkiAPI();
        if (connected) {
          setIsConnected(true);
          clearInterval(interval);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="fixed bottom-0 left-0 py-2 bg-blue-400 w-full text-center text-white font-medium">
      {isConnected
        ? "✅ Conectado ao Anki"
        : "⏳ Tentando conexão com API do Anki..."}
    </div>
  );
};

export default AnkiConnectionStatusCard;
