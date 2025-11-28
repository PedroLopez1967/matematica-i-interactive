import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { MathRenderer } from '../../math/MathRenderer';

export const ShadedAreaCalculator: React.FC = () => {
    // Problem: Square of side 8 with 4 quarter circles of radius 4 at corners
    // Or circle inscribed in square.
    // Let's use the "Square minus 4 quarter circles" (which equals Square minus 1 full circle)

    const side = 8;
    const radius = 4;

    const squareArea = side * side;
    const circleArea = Math.PI * radius * radius;
    const shadedArea = squareArea - circleArea;

    return (
        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Problema I.2: Área de la Región Sombreada</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center bg-gray-100 rounded-xl p-8">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                        {/* Square */}
                        <rect x="0" y="0" width="200" height="200" fill="#3B82F6" />

                        {/* 4 Quarter Circles (white to simulate cutout) */}
                        <path d="M 0 0 L 0 100 A 100 100 0 0 0 100 0 Z" fill="white" />
                        <path d="M 200 0 L 100 0 A 100 100 0 0 0 200 100 Z" fill="white" />
                        <path d="M 200 200 L 200 100 A 100 100 0 0 0 100 200 Z" fill="white" />
                        <path d="M 0 200 L 100 200 A 100 100 0 0 0 0 100 Z" fill="white" />

                        {/* Labels */}
                        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="bold">
                            Sombreado
                        </text>
                        <text x="10" y="100" fill="black" fontSize="12">8 cm</text>
                    </svg>
                </div>

                <div className="space-y-4">
                    <p>Calcula el área de la región sombreada en azul dentro del cuadrado de lado 8 cm.</p>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <span>Área del Cuadrado:</span>
                            <span><MathRenderer inline expression="8^2 = 64" /></span>
                        </div>
                        <div className="flex justify-between">
                            <span>Área del Recorte (4 × ¼ Círculo):</span>
                            <span><MathRenderer inline expression="\pi \cdot 4^2 = 16\pi" /></span>
                        </div>
                        <div className="border-t pt-2 font-bold flex justify-between">
                            <span>Área Sombreada:</span>
                            <span><MathRenderer inline expression="64 - 16\pi \approx 13.73" /></span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
