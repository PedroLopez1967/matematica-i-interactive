import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Trophy, Star } from 'lucide-react';

export const Header: React.FC = () => {
    const { progress } = useStore();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <span>📐</span> Matemática I
                </Link>

                <nav className="hidden md:flex gap-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Inicio</Link>
                    <Link to="/objectives" className="text-gray-600 hover:text-blue-600 font-medium">Objetivos</Link>
                    <Link to="/progress" className="text-gray-600 hover:text-blue-600 font-medium">Progreso</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 font-bold">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>{progress.totalXP} XP</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full text-blue-700 font-bold">
                        <Trophy className="w-4 h-4 text-blue-500" />
                        <span>Lvl {progress.level}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
