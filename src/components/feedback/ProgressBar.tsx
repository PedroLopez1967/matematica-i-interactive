import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
    value: number;
    max: number;
    label?: string;
    showPercentage?: boolean;
    color?: string;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max,
    label,
    showPercentage = false,
    color = 'bg-blue-600',
    className
}) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn("w-full", className)}>
            {(label || showPercentage) && (
                <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                    {label && <span>{label}</span>}
                    {showPercentage && <span>{Math.round(percentage)}%</span>}
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    className={cn("h-2.5 rounded-full", color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};
