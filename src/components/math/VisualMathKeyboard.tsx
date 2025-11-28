import React from 'react';
import { Delete, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface VisualMathKeyboardProps {
    onKeyPress: (key: string) => void;
    onDelete: () => void;
    onClear: () => void;
    onEnter?: () => void;
    className?: string;
}

export const VisualMathKeyboard: React.FC<VisualMathKeyboardProps> = ({
    onKeyPress,
    onDelete,
    onClear,
    onEnter,
    className
}) => {
    const [activeTab, setActiveTab] = React.useState<'numbers' | 'functions' | 'special'>('numbers');

    const tabs = [
        { id: 'numbers', label: '123' },
        { id: 'functions', label: 'f(x)' },
        { id: 'special', label: 'αβγ' },
    ] as const;

    const numberKeys = [
        ['7', '8', '9', '÷', '^'],
        ['4', '5', '6', '×', '√'],
        ['1', '2', '3', '-', 'π'],
        ['0', '.', '=', '+', 'e'],
    ];

    const functionKeys = [
        ['sin', 'cos', 'tan', '(', ')'],
        ['ln', 'log', 'e^x', '[', ']'],
        ['|x|', 'x²', 'x³', '<', '>'],
        ['≤', '≥', '≠', '∞', '!'],
    ];

    const specialKeys = [
        ['x', 'y', 'z', 'k', 'm'],
        ['α', 'β', 'θ', 'λ', 'Δ'],
        ['∈', '∉', '∪', '∩', '⊂'],
        ['∀', '∃', '⇒', '⇔', '∅'],
    ];

    const renderKey = (key: string) => {
        const isOperator = ['+', '-', '×', '÷', '=', '<', '>', '≤', '≥', '≠'].includes(key);


        return (
            <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={cn(
                    "h-12 rounded-lg font-medium text-lg shadow-sm active:scale-95 transition-transform",
                    isOperator ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-white text-gray-700 hover:bg-gray-50",
                    "border border-gray-200"
                )}
            >
                {key}
            </button>
        );
    };

    const currentKeys = activeTab === 'numbers' ? numberKeys
        : activeTab === 'functions' ? functionKeys
            : specialKeys;

    return (
        <div className={cn("bg-gray-100 p-2 rounded-xl shadow-inner", className)}>
            <div className="flex gap-1 mb-2 bg-gray-200 p-1 rounded-lg">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 py-1.5 text-sm font-medium rounded-md transition-colors",
                            activeTab === tab.id
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-gray-300"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-5 gap-2 mb-2">
                {currentKeys.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((key) => renderKey(key))}
                    </React.Fragment>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-2">
                <button
                    onClick={onClear}
                    className="h-12 rounded-lg font-medium text-sm bg-red-100 text-red-600 hover:bg-red-200 border border-red-200"
                >
                    CLEAR
                </button>
                <button
                    onClick={() => onKeyPress(' ')} // Space
                    className="h-12 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                >
                    SPACE
                </button>
                <button
                    onClick={onDelete}
                    className="h-12 rounded-lg flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                >
                    <Delete className="w-5 h-5" />
                </button>
                <button
                    onClick={onEnter}
                    className="h-12 rounded-lg flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                >
                    <Check className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
