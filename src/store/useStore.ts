import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, StudentProgress } from '../types';

const initialProgress: StudentProgress = {
    studentId: '',
    studentName: 'Estudiante',
    totalXP: 0,
    level: 1,
    completedProblems: [],
    objectiveProgress: {
        'I.1': 0,
        'I.2': 0,
        'I.3': 0,
        'II.1': 0,
    },
    achievements: [],
    streak: 0,
    lastActive: new Date().toISOString(),
};

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            progress: initialProgress,
            currentScenario: 'visual_lab', // Default scenario
            theme: 'light',
            studentIdDigits: '',

            setScenario: (scenario) => set({ currentScenario: scenario }),
            setTheme: (theme) => set({ theme }),
            setStudentIdDigits: (digits) => set({ studentIdDigits: digits }),

            addXP: (amount) => set((state) => ({
                progress: {
                    ...state.progress,
                    totalXP: state.progress.totalXP + amount,
                    level: Math.floor((state.progress.totalXP + amount) / 100) + 1
                }
            })),

            completeProblem: (problemId) => set((state) => ({
                progress: {
                    ...state.progress,
                    completedProblems: [...state.progress.completedProblems, problemId],
                }
            })),

            toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

            unlockAchievement: (id) => set((state) => {
                if (state.progress.achievements.includes(id)) return state;
                return {
                    progress: {
                        ...state.progress,
                        achievements: [...state.progress.achievements, id]
                    }
                };
            }),
        }),
        {
            name: 'math-i-storage',
        }
    )
);
