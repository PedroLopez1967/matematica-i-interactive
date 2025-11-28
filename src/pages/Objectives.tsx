import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Objectives: React.FC = () => {
    const objectives = [
        { id: 'I.1', title: 'Sistemas Numéricos y Operaciones', path: '/objectives/I.1', description: 'Inversión de capital, secuencia de Collatz y ecuaciones.' },
        { id: 'I.2', title: 'Radicales y Geometría', path: '/objectives/I.2', description: 'Simplificación de radicales y cálculo de áreas sombreadas.' },
        { id: 'I.3', title: 'Desigualdades y Conjuntos', path: '/objectives/I.3', description: 'Desigualdades con valor absoluto y operaciones de conjuntos.' },
        { id: 'II.1', title: 'Geometría Analítica', path: '/objectives/II.1', description: 'Rectas, pendientes y construcción de triángulos.' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Objetivos de Aprendizaje</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {objectives.map((obj) => (
                    <Link key={obj.id} to={obj.path}>
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{obj.id}: {obj.title}</span>
                                    <ArrowRight className="w-5 h-5 text-blue-500" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{obj.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
