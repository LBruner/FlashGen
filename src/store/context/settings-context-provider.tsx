import React, {createContext, ReactNode, useContext} from "react";
import useSWR, {SWRResponse} from "swr";
import axiosApi from "@/lib/axios-api";
import {ankiPaths} from "@/path-routes";
import {ApiResponse} from "@/models/api-response";

interface SettingsContextProvider {
    isAnkiConnected: boolean;
}

const AppSettingsContext = createContext<SettingsContextProvider | undefined>(undefined);

const fetcher = (url: string) => {
    try{
        return axiosApi.get(url).then(res => res.data);
    }catch (e) {
        console.log(e)
    }
};

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const {data}: SWRResponse<ApiResponse<Array<string>>> = useSWR(ankiPaths.getConnection(), fetcher, {refreshInterval: 1000});
    const isAnkiConnected = data != null && data?.success;

    return (
        <AppSettingsContext.Provider value={{isAnkiConnected}}>
            {children}
        </AppSettingsContext.Provider>
    );
};

export const useAppSettings = () => {
    const context = useContext(AppSettingsContext);
    if (!context) {
        throw new Error('useAppSettings must be used within a AppSettingsProvider');
    }
    return context;
};