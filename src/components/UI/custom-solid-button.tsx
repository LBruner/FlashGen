import React from "react";

interface CustomSolidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: React.ReactNode;
}

const CustomSolidButton = React.forwardRef<HTMLButtonElement, CustomSolidButtonProps>(
    ({text, icon, className, disabled, ...props}, ref) => {
        return (
            <div className={'w-auto'}>
                <button
                    ref={ref}
                    disabled={disabled}
                    {...props}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 border focus:outline-none focus:ring-2 shadow-sm ${
                        disabled
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-500'
                            : 'border-gray-600 text-gray-900 dark:bg-slate-50/10 dark:border-transparent dark:text-white focus:ring-gray-500/50 focus:border-none hover:bg-gray-50 dark:hover:bg-slate-50/20'
                    } ${className || ''}`}
                >
                    {icon && <span className={disabled ? 'opacity-50' : ''}>{icon}</span>}
                    <span>{text}</span>
                </button>
            </div>
        );
    }
);

CustomSolidButton.displayName = 'CustomSolidButton';

export default CustomSolidButton;