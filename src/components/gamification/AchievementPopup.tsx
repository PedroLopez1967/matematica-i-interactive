import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AchievementPopup: React.FC = () => {
    const { progress } = useStore();
    const { level } = progress;
    const [prevLevel, setPrevLevel] = useState(level);
    const [showLevelUp, setShowLevelUp] = useState(false);

    useEffect(() => {
        if (level > prevLevel) {
            setShowLevelUp(true);
            const timer = setTimeout(() => setShowLevelUp(false), 4000);
            setPrevLevel(level);
            return () => clearTimeout(timer);
        }
    }, [level, prevLevel]);

    return (
        <AnimatePresence>
            {showLevelUp && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
                >
                    <div className="bg-yellow-400 text-yellow-900 px-6 py-4 rounded-full shadow-lg flex items-center gap-4 border-4 border-white">
                        <div className="bg-white p-2 rounded-full">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                            <div className="font-bold text-lg leading-none">Level Up!</div>
                            <div className="text-sm font-medium opacity-90">You reached Level {level}</div>
                        </div>
                        <button onClick={() => setShowLevelUp(false)} className="ml-2 p-1 hover:bg-yellow-500 rounded-full">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
