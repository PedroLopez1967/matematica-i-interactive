import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { Button } from '../../common/Button';
import { MathRenderer } from '../../math/MathRenderer';
import { NumberLine } from '../../visualizations/NumberLine';
import { motion } from 'framer-motion';

export const InequalitySolver: React.FC = () => {
    const [showSolution, setShowSolution] = useState(false);

    // Problem: |(5/4)y - 2| >= 3m
    // Let m = 2 for example
    const m = 2;
    const rhs = 3 * m; // 6

    // Case 1: (5/4)y - 2 >= 6 -> (5/4)y >= 8 -> y >= 32/5 (6.4)
    // Case 2: (5/4)y - 2 <= -6 -> (5/4)y <= -4 -> y <= -16/5 (-3.2)

    const solution1 = 6.4;
    const solution2 = -3.2;

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Problema I.3: Desigualdad con Valor Absoluto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center py-4">
                    <p className="text-gray-600 mb-2">Resuelve para <MathRenderer inline expression="y" /> dado <MathRenderer inline expression={`m=${m}`} />:</p>
                    <div className="text-2xl">
                        <MathRenderer expression={`|\\frac{5}{4}y - 2| \\ge ${rhs}`} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-4 text-center">Visualización de la Solución</h4>
                    <NumberLine
                        min={-10}
                        max={10}
                        intervals={[
                            { start: -10, end: solution2, color: '#10B981', endOpen: false },
                            { start: solution1, end: 10, color: '#10B981', startOpen: false }
                        ]}
                        points={[
                            { value: solution2, label: String(solution2), color: '#10B981' },
                            { value: solution1, label: String(solution1), color: '#10B981' }
                        ]}
                    />
                </div>

                <div className="flex justify-center">
                    <Button onClick={() => setShowSolution(!showSolution)}>
                        {showSolution ? 'Ocultar Solución' : 'Mostrar Pasos de Solución'}
                    </Button>
                </div>

                {showSolution && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 p-6 rounded-xl space-y-4"
                    >
                        <p>Dividir en dos casos:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded border">
                                <h5 className="font-bold text-blue-600">Caso 1 (Positivo)</h5>
                                <MathRenderer expression={`\\frac{5}{4}y - 2 \\ge ${rhs}`} />
                                <MathRenderer expression={`\\frac{5}{4}y \\ge ${rhs + 2}`} />
                                <MathRenderer expression={`y \\ge ${rhs + 2} \\cdot \\frac{4}{5}`} />
                                <MathRenderer expression={`y \\ge ${solution1}`} />
                            </div>
                            <div className="bg-white p-4 rounded border">
                                <h5 className="font-bold text-red-600">Caso 2 (Negativo)</h5>
                                <MathRenderer expression={`\\frac{5}{4}y - 2 \\le -${rhs}`} />
                                <MathRenderer expression={`\\frac{5}{4}y \\le -${rhs} + 2`} />
                                <MathRenderer expression={`y \\le ${-rhs + 2} \\cdot \\frac{4}{5}`} />
                                <MathRenderer expression={`y \\le ${solution2}`} />
                            </div>
                        </div>
                        <div className="text-center pt-2">
                            <span className="font-bold">Notación de Intervalo: </span>
                            <MathRenderer inline expression={`(-\\infty, -3.2] \\cup [6.4, \\infty)`} />
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
};
