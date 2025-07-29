import {XIcon as CloseIcon} from 'lucide-react';
import {ToastContentProps} from "react-toastify";
import React from "react";

type CustomNotificationProps = ToastContentProps<{
    title: string;
    content: string;
    actionButton?: React.ReactNode;
}>;

const CustomNotificationContainer = ({closeToast, data, toastProps}: CustomNotificationProps) => {
    const {theme = 'light'} = toastProps;

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-black';
    const secondaryTextColor = isDark ? 'text-white' : 'text-gray-600';
    const bgButtonColor = isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700';

    return (
        <div className="flex w-full">
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p className={`font-semibold ${textColor}`}>{data.title}</p>
                    </div>
                    <div className="pr-2">
                        <button onClick={closeToast}><CloseIcon/></button>
                    </div>
                </div>
                <div className="flex gap">
                    <p className={`text-sm ${secondaryTextColor}`}>{data.content}</p>
                </div>
                <div className="flex gap-4 mt-2">
                    <button onClick={closeToast}
                            className={`font-semibold text-sm py-2 px-3 rounded ${bgButtonColor}`}>Close
                    </button>
                    {data.actionButton}
                </div>
            </div>
        </div>
    );
}

export default CustomNotificationContainer;