import React from "react";

interface CustomSolidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: React.ReactNode;
}

const CustomSolidButton = React.forwardRef<HTMLButtonElement, CustomSolidButtonProps>(
    ({text, icon, className, ...props}, ref) => {
        return (
            <div className={'w-auto'}>
                <button
                    ref={ref}
                    {...props}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 border border-gray-600 text-gray-900 dark:bg-slate-50/10 dark:border-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-none shadow-sm ${className || ''}`}
                >
                    {icon}
                    <span>{text}</span>
                </button>
            </div>
        );
    }
);

CustomSolidButton.displayName = 'CustomSolidButton';

export default CustomSolidButton;