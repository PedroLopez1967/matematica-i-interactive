import React, { useState, useRef, useEffect } from 'react';
import { Keyboard as KeyboardIcon } from 'lucide-react';
import { VisualMathKeyboard } from './VisualMathKeyboard';
import { MathRenderer } from './MathRenderer';
import { cn } from '../../utils/cn';

interface MathInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
}

export const MathInput: React.FC<MathInputProps> = ({
    value,
    onChange,
    placeholder = 'Enter math expression...',
    className,
    label
}) => {
    const [showKeyboard, setShowKeyboard] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close keyboard when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowKeyboard(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyPress = (key: string) => {
        // Simple insertion logic - in a real app this would be more complex (cursor position etc)
        // For now, just append
        let newKey = key;
        if (key === '×') newKey = '\\times ';
        if (key === '÷') newKey = '\\div ';
        if (key === '√') newKey = '\\sqrt{}';
        if (key === 'π') newKey = '\\pi ';
        if (key === '∞') newKey = '\\infty ';
        if (key === '≤') newKey = '\\le ';
        if (key === '≥') newKey = '\\ge ';
        if (key === '≠') newKey = '\\neq ';
        if (key === 'x²') newKey = '^2';
        if (key === 'x³') newKey = '^3';

        onChange(value + newKey);
        inputRef.current?.focus();
    };

    const handleDelete = () => {
        onChange(value.slice(0, -1));
        inputRef.current?.focus();
    };

    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg"
                    onFocus={() => setShowKeyboard(true)}
                />
                <button
                    type="button"
                    onClick={() => setShowKeyboard(!showKeyboard)}
                    className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors",
                        showKeyboard ? "text-blue-600 bg-blue-50" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <KeyboardIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Live Preview */}
            {value && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[3rem] flex items-center">
                    <span className="text-xs text-gray-400 mr-2 uppercase tracking-wider font-bold">Preview:</span>
                    <MathRenderer expression={value} className="text-lg" />
                </div>
            )}

            {/* Virtual Keyboard */}
            {showKeyboard && (
                <div className="absolute z-10 mt-2 w-full max-w-md left-0 sm:left-auto">
                    <VisualMathKeyboard
                        onKeyPress={handleKeyPress}
                        onDelete={handleDelete}
                        onClear={handleClear}
                        onEnter={() => setShowKeyboard(false)}
                        className="shadow-xl border border-gray-200"
                    />
                </div>
            )}
        </div>
    );
};
