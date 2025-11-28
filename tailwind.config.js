/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Math Quest Adventure
                'quest-primary': '#2563EB',
                'quest-secondary': '#10B981',
                'quest-accent': '#F59E0B',
                'quest-bg': '#FEF3C7',

                // Visual Math Lab
                'lab-primary': '#7C3AED',
                'lab-secondary': '#06B6D4',
                'lab-accent': '#EC4899',
                'lab-bg': '#F3F4F6',

                // Problem Detective
                'detective-primary': '#1E3A8A',
                'detective-secondary': '#F59E0B',
                'detective-accent': '#DC2626',
                'detective-bg': '#FEF3C7',

                // Math Sports Arena
                'sports-primary': '#22C55E',
                'sports-secondary': '#3B82F6',
                'sports-accent': '#EAB308',
                'sports-bg': '#E5E7EB',

                // Number Stories
                'story-primary': '#F97316',
                'story-secondary': '#A78BFA',
                'story-accent': '#059669',
                'story-bg': '#FFFBEB',
            },
            fontFamily: {
                // Math Quest
                'quest-header': ['"Fredoka One"', 'cursive'],
                'quest-body': ['Nunito', 'sans-serif'],

                // Visual Lab
                'lab-header': ['Poppins', 'sans-serif'],
                'lab-body': ['Inter', 'sans-serif'],

                // Problem Detective
                'detective-header': ['"Courier New"', 'monospace'],
                'detective-body': ['Georgia', 'serif'],

                // Sports Arena
                'sports-header': ['"Bebas Neue"', 'sans-serif'],
                'sports-body': ['Roboto', 'sans-serif'],

                // Number Stories
                'story-header': ['Merriweather', 'serif'],
                'story-body': ['"Crimson Text"', 'serif'],

                // General
                'math': ['KaTeX_Main', 'serif'],
                'code': ['"Fira Code"', 'monospace'],
            },
        },
    },
    plugins: [],
}
