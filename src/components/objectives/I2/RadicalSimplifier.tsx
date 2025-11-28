import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { Button } from '../../common/Button';
import { MathRenderer } from '../../math/MathRenderer';
import { motion } from 'framer-motion';

export const RadicalSimplifier: React.FC = () => {
    const [showSteps, setShowSteps] = useState(false);

    // Example problem: Simplify sqrt(11 + 6*sqrt(2))
    // k = 11, m = 6, n = 2
    // Form: sqrt(A + B) where B = 2*sqrt(C)
    // 6*sqrt(2) = 2*3*sqrt(2) = 2*sqrt(9*2) = 2*sqrt(18)
    // Find x, y such that x+y=11 and x*y=18 -> 9 and 2
    // Result: sqrt(9) + sqrt(2) = 3 + sqrt(2)

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Problema I.2: Simplificación de Radicales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center py-8">
                    <p className="text-lg text-gray-600 mb-4">Simplifica la siguiente expresión:</p>
                    <div className="text-3xl">
                        <MathRenderer expression="\sqrt{11 + 6\sqrt{2}}" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button onClick={() => setShowSteps(!showSteps)}>
                        {showSteps ? 'Ocultar Pasos' : 'Mostrar Pasos de Simplificación'}
                    </Button>
                </div>

                {showSteps && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-gray-50 p-6 rounded-xl space-y-4"
                    >
                        <div className="step">
                            <h4 className="font-bold text-gray-700">Paso 1: Transformar a <MathRenderer inline expression="\sqrt{A + 2\sqrt{B}}" /></h4>
                            <p>Necesitamos mover el factor 3 dentro de la raíz interna:</p>
                            <MathRenderer expression="6\sqrt{2} = 2 \cdot 3 \sqrt{2} = 2\sqrt{3^2 \cdot 2} = 2\sqrt{18}" />
                            <p>Así que la expresión se convierte en:</p>
                            <MathRenderer expression="\sqrt{11 + 2\sqrt{18}}" />
                        </div>

                        <div className="step">
                            <h4 className="font-bold text-gray-700">Paso 2: Encontrar dos números</h4>
                            <p>Encuentra <MathRenderer inline expression="x" /> y <MathRenderer inline expression="y" /> tales que:</p>
                            <ul className="list-disc list-inside ml-4">
                                <li><MathRenderer inline expression="x + y = 11" /></li>
                                <li><MathRenderer inline expression="x \cdot y = 18" /></li>
                            </ul>
                            <p className="mt-2">Los números son <strong>9</strong> y <strong>2</strong>.</p>
                        </div>

                        <div className="step">
                            <h4 className="font-bold text-gray-700">Paso 3: Aplicar Fórmula</h4>
                            <p>Usando <MathRenderer inline expression="\sqrt{x+y + 2\sqrt{xy}} = \sqrt{x} + \sqrt{y}" />:</p>
                            <MathRenderer expression="\sqrt{9} + \sqrt{2} = 3 + \sqrt{2}" />
                        </div>

                        <div className="bg-green-100 p-4 rounded-lg border border-green-200 text-center">
                            <span className="font-bold text-green-800">Respuesta Final: </span>
                            <MathRenderer expression="3 + \sqrt{2}" className="text-xl" />
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
};
