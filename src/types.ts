export type Objective = 'I.1' | 'I.2' | 'I.3' | 'II.1';

export interface Problem {
    id: string;
    objective: Objective;
    title: string;
    description: string;
    type: string;
    difficulty: number;
    points: number;
    isPersonalized?: boolean;
}

export interface StudentProgress {
    studentId: string;
    studentName: string;
    totalXP: number;
    level: number;
    completedProblems: string[];
    objectiveProgress: Record<Objective, number>;
    achievements: string[];
    streak: number;
    lastActive: string; // ISO date string
}

export interface AppState {
    progress: StudentProgress;
    currentScenario: string;
    theme: string;
    studentIdDigits: string; // Last digits for personalization

    // Actions
    setScenario: (scenario: string) => void;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
    unlockAchievement: (id: string) => void;
    setStudentIdDigits: (digits: string) => void;
    addXP: (amount: number) => void;
    completeProblem: (problemId: string) => void;
}
