import {CheckIcon, InfoIcon, XIcon as CloseIcon, AlertTriangleIcon, XCircleIcon} from 'lucide-react';
import {ToastContentProps} from "react-toastify";

type CustomNotificationProps = ToastContentProps<{
    title: string;
    content: string;
    onClickActionBtn: () => void;
}>;

const CustomNotificationContainer = ({closeToast, data, toastProps}: CustomNotificationProps) => {
    const {type = 'info', theme = 'light'} = toastProps;
    const {color, Icon} = typeStyles[type] || typeStyles.info;

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-black';
    const secondaryTextColor = isDark ? 'text-white' : 'text-gray-600';
    const bgButtonColor = isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700';

    return (
        <div className="flex w-full">
            <div className={`w-4 border-l-4 border-l-${color} rounded-l-lg`}/>
            <div className="flex flex-col w-full py-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <div className={`flex justify-center items-center rounded-full w-4 h-4 bg-${color}`}>
                            <Icon size={19} color="white"/>
                        </div>
                        <p className={`font-semibold ${textColor}`}>{data.title}</p>
                    </div>
                    <div className="pr-2">
                        <button onClick={closeToast}><CloseIcon/></button>
                    </div>
                </div>
                <div className="flex gap">
                    <div className="w-6"/>
                    <p className={`text-sm ${secondaryTextColor}`}>{data.content}</p>
                </div>
                <div className="flex gap-4 mt-2">
                    <div className="w-2"/>
                    <button onClick={closeToast}
                            className={`font-semibold text-sm py-2 px-3 rounded ${bgButtonColor}`}>Close
                    </button>
                    <button onClick={data.onClickActionBtn} className="font-semibold text-sm text-blue-400">View Guide</button>
                </div>
            </div>
        </div>
    );
}

export default CustomNotificationContainer;

const typeStyles: any = {
    success: {
        color: 'green-500',
        Icon: CheckIcon,
    },
    info: {
        color: 'blue-500',
        Icon: InfoIcon,
    },
    error: {
        color: 'red-500',
        Icon: XCircleIcon,
    },
    warning: {
        bgColor: 'yellow-500',
        Icon: AlertTriangleIcon,
    }
};
