'use client';

import React from "react";
import useSWR from "swr";
import {ankiPaths} from "@/path-routes";
import axiosApi from "@/lib/AxiosApi";

const fetcher = (url: string) => axiosApi.get(url).then(res => res.data)

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
    endContent: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({title, subtitle, endContent}) => {
    const {
    } = useSWR(ankiPaths.getConnection(), fetcher, {refreshInterval: 1000})

    return (
        <div className={'flex justify-between w-full items-center'}>
            <div className={'flex flex-col'}>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className={'text-gray-300'}>{subtitle}</p>
            </div>
            <div>
                {endContent}
            </div>
        </div>
    )
}

export default DashboardHeader;