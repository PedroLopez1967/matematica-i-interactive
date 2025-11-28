import React from 'react';
import { useScenario, type ScenarioTheme } from './ScenarioManager';

import { Lock, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const themes: { id: ScenarioTheme; label: string; color: string }[] = [
    { id: 'default', label: 'Estándar', color: 'bg-blue-500' },
    { id: 'space', label: 'Misión Espacial', color: 'bg-indigo-900' },
    { id: 'engineering', label: 'Ingeniería', color: 'bg-orange-600' },
    { id: 'finance', label: 'Wall Street', color: 'bg-green-700' },
    { id: 'nature', label: 'Ecosistemas', color: 'bg-emerald-500' },
    { id: 'art', label: 'Estudio de Diseño', color: 'bg-purple-600' },
];

export const ThemeSelector: React.FC = () => {
    const { theme, setTheme, unlockedThemes } = useScenario();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map((t) => {
                const isUnlocked = unlockedThemes.includes(t.id);
                const isActive = theme === t.id;

                return (
                    <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => isUnlocked && setTheme(t.id)}
                        className={`
              relative p-4 rounded-xl border-2 text-left transition-all
              ${isActive ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
              ${!isUnlocked ? 'opacity-70 cursor-not-allowed bg-gray-50' : 'bg-white hover:border-blue-300'}
            `}
                    >
                        <div className={`w-8 h-8 rounded-full mb-3 ${t.color} flex items-center justify-center text-white`}>
                            {isActive && <Check className="w-5 h-5" />}
                            {!isUnlocked && <Lock className="w-4 h-4" />}
                        </div>
                        <div className="font-bold text-gray-900">{t.label}</div>
                        <div className="text-xs text-gray-500">
                            {isUnlocked ? (isActive ? 'Activo' : 'Seleccionar') : 'Bloqueado'}
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
};
