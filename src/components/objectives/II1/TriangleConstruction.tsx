import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { Button } from '../../common/Button';
import { MathRenderer } from '../../math/MathRenderer';
import { motion } from 'framer-motion';

export const TriangleConstruction: React.FC = () => {
    const [showSolution, setShowSolution] = useState(false);

    // Problem: Given midpoints M1(2,1), M2(5,3), M3(3,4)
    // Find vertices A, B, C
    // A = M1 + M3 - M2 = (2+3-5, 1+4-3) = (0, 2)
    // B = M1 + M2 - M3 = (2+5-3, 1+3-4) = (4, 0)
    // C = M2 + M3 - M1 = (5+3-2, 3+4-1) = (6, 6)

    const midpoints = [
        { x: 2, y: 1, label: 'M1' },
        { x: 5, y: 3, label: 'M2' },
        { x: 3, y: 4, label: 'M3' }
    ];

    const vertices = [
        { x: 0, y: 2, label: 'A' },
        { x: 4, y: 0, label: 'B' },
        { x: 6, y: 6, label: 'C' }
    ];

    return (
        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Problema II.1: Triángulo desde Puntos Medios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="mb-4">Los puntos medios de los lados de un triángulo son:</p>
                    <div className="flex gap-4 justify-center font-mono text-lg">
                        <span>M1(2, 1)</span>
                        <span>M2(5, 3)</span>
                        <span>M3(3, 4)</span>
                    </div>
                    <p className="mt-4">Encuentra las coordenadas de los vértices A, B y C.</p>
                </div>

                <div className="flex justify-center bg-white border rounded-xl p-4 h-64 relative overflow-hidden">
                    <svg viewBox="-2 -2 10 10" className="w-full h-full" style={{ transform: 'scale(1, -1)' }}>
                        {/* Grid */}
                        <defs>
                            <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
                                <path d="M 1 0 L 0 0 0 1" fill="none" stroke="gray" strokeWidth="0.05" />
                            </pattern>
                        </defs>
                        <rect x="-2" y="-2" width="12" height="12" fill="url(#grid)" />

                        {/* Midpoints */}
                        {midpoints.map((p, i) => (
                            <g key={i}>
                                <circle cx={p.x} cy={p.y} r="0.15" fill="#F59E0B" />
                                <text x={p.x + 0.2} y={p.y} fontSize="0.5" fill="#B45309" transform="scale(1, -1)">{p.label}</text>
                            </g>
                        ))}

                        {/* Solution Triangle */}
                        {showSolution && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <polygon
                                    points={`${vertices[0].x},${vertices[0].y} ${vertices[1].x},${vertices[1].y} ${vertices[2].x},${vertices[2].y}`}
                                    fill="rgba(37, 99, 235, 0.1)"
                                    stroke="#2563EB"
                                    strokeWidth="0.1"
                                />
                                {vertices.map((p, i) => (
                                    <g key={`v-${i}`}>
                                        <circle cx={p.x} cy={p.y} r="0.15" fill="#2563EB" />
                                        <text x={p.x + 0.2} y={p.y} fontSize="0.5" fill="#1E40AF" transform="scale(1, -1)">{p.label}</text>
                                    </g>
                                ))}
                            </motion.g>
                        )}
                    </svg>
                </div>

                <div className="flex justify-center">
                    <Button onClick={() => setShowSolution(!showSolution)}>
                        {showSolution ? 'Ocultar Solución' : 'Mostrar Solución'}
                    </Button>
                </div>

                {showSolution && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 p-6 rounded-xl space-y-2"
                    >
                        <h4 className="font-bold">Fórmulas:</h4>
                        <p><MathRenderer inline expression="A = M_1 + M_3 - M_2 = (2+3-5, 1+4-3) = (0, 2)" /></p>
                        <p><MathRenderer inline expression="B = M_1 + M_2 - M_3 = (2+5-3, 1+3-4) = (4, 0)" /></p>
                        <p><MathRenderer inline expression="C = M_2 + M_3 - M_1 = (5+3-2, 3+4-1) = (6, 6)" /></p>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
};
