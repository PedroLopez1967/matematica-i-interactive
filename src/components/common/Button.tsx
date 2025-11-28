import React from 'react';

import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

// Note: We need to install class-variance-authority if we want to use cva, 
// but for now I'll implement it with simple clsx/cn to avoid adding more deps unless necessary.
// Actually, cva is great but let's stick to simple props for now to keep it lightweight 
// or I can add it. The plan didn't explicitly say add cva, but it's standard.
// Let's use standard props pattern without cva to save a dependency install step if not needed,
// but actually I'll just use a switch/map or simple conditional logic.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500",
        outline: "border-2 border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};
