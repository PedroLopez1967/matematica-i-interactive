import React, { useState } from 'react';
import { Lightbulb, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export interface Hint {
    id: string;
    level: number;
    text: string;
    cost: number;
}

interface HintSystemProps {
    hints: Hint[];
    unlockedHints: string[]; // IDs of unlocked hints
    onUnlockHint: (hintId: string, cost: number) => void;
    userXP: number;
}

export const HintSystem: React.FC<HintSystemProps> = ({
    hints,
    unlockedHints,
    onUnlockHint,
    userXP
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const sortedHints = [...hints].sort((a, b) => a.level - b.level);

    return (
        <div className="w-full">
            <Button
                variant="outline"
                size="sm"
                leftIcon={<Lightbulb className="w-4 h-4" />}
                onClick={() => setIsOpen(!isOpen)}
                className="mb-4"
            >
                {isOpen ? 'Hide Hints' : 'Need a Hint?'}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                            {sortedHints.map((hint, index) => {
                                const isUnlocked = unlockedHints.includes(hint.id);
                                const canUnlock = index === 0 || unlockedHints.includes(sortedHints[index - 1].id);

                                return (
                                    <div
                                        key={hint.id}
                                        className={cn(
                                            "p-3 rounded-lg border transition-all",
                                            isUnlocked
                                                ? "bg-white border-yellow-200 shadow-sm"
                                                : "bg-gray-50 border-gray-200 opacity-75"
                                        )}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                                                    Hint {index + 1}
                                                </span>
                                                {isUnlocked ? (
                                                    <p className="text-gray-800 text-sm">{hint.text}</p>
                                                ) : (
                                                    <div className="flex items-center text-gray-500 text-sm italic">
                                                        <Lock className="w-3 h-3 mr-2" />
                                                        Locked
                                                    </div>
                                                )}
                                            </div>

                                            {!isUnlocked && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    disabled={!canUnlock || userXP < hint.cost}
                                                    onClick={() => onUnlockHint(hint.id, hint.cost)}
                                                    className="ml-4 shrink-0"
                                                >
                                                    Unlock (-{hint.cost} XP)
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
