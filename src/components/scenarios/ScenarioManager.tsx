import React, { createContext, useContext, useState, useEffect } from 'react';

export type ScenarioTheme = 'default' | 'space' | 'engineering' | 'finance' | 'nature' | 'art';

interface ScenarioContextType {
    theme: ScenarioTheme;
    setTheme: (theme: ScenarioTheme) => void;
    unlockedThemes: ScenarioTheme[];
    unlockTheme: (theme: ScenarioTheme) => void;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export const ScenarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ScenarioTheme>(() => {
        return (localStorage.getItem('scenario_theme') as ScenarioTheme) || 'default';
    });

    const [unlockedThemes, setUnlockedThemes] = useState<ScenarioTheme[]>(() => {
        const saved = localStorage.getItem('unlocked_themes');
        return saved ? JSON.parse(saved) : ['default'];
    });

    useEffect(() => {
        localStorage.setItem('scenario_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('unlocked_themes', JSON.stringify(unlockedThemes));
    }, [unlockedThemes]);

    const unlockTheme = (newTheme: ScenarioTheme) => {
        if (!unlockedThemes.includes(newTheme)) {
            setUnlockedThemes(prev => [...prev, newTheme]);
        }
    };

    return (
        <ScenarioContext.Provider value={{ theme, setTheme, unlockedThemes, unlockTheme }}>
            {children}
        </ScenarioContext.Provider>
    );
};

export const useScenario = () => {
    const context = useContext(ScenarioContext);
    if (!context) {
        throw new Error('useScenario must be used within a ScenarioProvider');
    }
    return context;
};
