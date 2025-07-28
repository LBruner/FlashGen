'use client';
import React, {useEffect} from "react";
import {toast, ToastContainer, TypeOptions} from "react-toastify";
import CustomNotificationContainer from "@/components/UI/toast/CustomNotificationContainer";
import {useTheme} from "next-themes";

interface CustomToastProps {
    shouldDisplayToast: boolean,
    title: string,
    content: string,
    type: TypeOptions,
    onClickActionBtn: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({shouldDisplayToast, type, title, content, onClickActionBtn}) => {
    const {theme} = useTheme();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            toast.dismiss();

            if (shouldDisplayToast) {
                toast(CustomNotificationContainer, {
                    data: {
                        title,
                        content,
                        onClickActionBtn,
                    },
                    ariaLabel: 'Something went wrong',
                    autoClose: false,
                    closeButton: false,
                    className: 'p-0',
                    type: type || 'default',
                    icon: false,
                    theme,
                });
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [shouldDisplayToast, theme]);

    return <ToastContainer limit={1} className="mt-16"/>;
};


export default React.memo(CustomToast);