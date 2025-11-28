import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const Home: React.FC = () => {
    const { progress } = useStore();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Bienvenido de nuevo, {progress.studentName}!</h1>
                <p className="text-xl text-gray-600">¿Listo para continuar tu aventura matemática?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">Comenzar a Aprender</h2>
                    <p className="text-gray-600 mb-4">Elige un objetivo para empezar a resolver problemas.</p>
                    <Link to="/objectives" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ir a Objetivos
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Tu Progreso</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>XP Total</span>
                            <span className="font-bold">{progress.totalXP}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Nivel</span>
                            <span className="font-bold">{progress.level}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Racha</span>
                            <span className="font-bold">{progress.streak} días</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
