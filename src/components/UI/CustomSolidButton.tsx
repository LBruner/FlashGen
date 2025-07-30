import React from "react";

interface CustomSolidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: React.ReactNode;
}

const CustomSolidButton = React.forwardRef<HTMLButtonElement, CustomSolidButtonProps>(
    ({ text, icon, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 border border-gray-300 dark:border-slate-600/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm ${className || ''}`}
            >
                {icon}
                <span>{text}</span>
            </button>
        );
    }
);

CustomSolidButton.displayName = 'CustomSolidButton';

export default CustomSolidButton;