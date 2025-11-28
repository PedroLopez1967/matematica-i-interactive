import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { Button } from '../../common/Button';
import { MathRenderer } from '../../math/MathRenderer';
import { motion } from 'framer-motion';

export const LinePerpendicularity: React.FC = () => {
    const [showSolution, setShowSolution] = useState(false);

    // Problem:
    // L1: 2x + 5y - 10 = 0 -> m1 = -2/5
    // L2: 3x - 2y + 4 = 0 -> m2 = 3/2
    // L3: kx + 10y - 8 = 0 -> m3 = -k/10
    // Find k such that L3 is perpendicular to L1.
    // Condition: m1 * m3 = -1
    // (-2/5) * (-k/10) = -1
    // 2k/50 = -1 -> k/25 = -1 -> k = -25

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Problema II.1: Perpendicularidad de Rectas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <p className="text-gray-700">Considera las rectas:</p>
                    <div className="grid gap-2 ml-4">
                        <div><span className="font-bold">L1:</span> <MathRenderer inline expression="2x + 5y - 10 = 0" /></div>
                        <div><span className="font-bold">L2:</span> <MathRenderer inline expression="3x - 2y + 4 = 0" /></div>
                        <div><span className="font-bold">L3:</span> <MathRenderer inline expression="kx + 10y - 8 = 0" /></div>
                    </div>
                    <p className="text-gray-700">Encuentra el valor de <MathRenderer inline expression="k" /> tal que <MathRenderer inline expression="L_3 \perp L_1" />.</p>
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
                        className="bg-blue-50 p-6 rounded-xl space-y-4 border border-blue-100"
                    >
                        <div className="step">
                            <h4 className="font-bold text-blue-800">Paso 1: Encontrar pendiente de L1</h4>
                            <MathRenderer expression="2x + 5y - 10 = 0 \implies 5y = -2x + 10 \implies y = -\frac{2}{5}x + 2" />
                            <p>Pendiente <MathRenderer inline expression="m_1 = -\frac{2}{5}" /></p>
                        </div>

                        <div className="step">
                            <h4 className="font-bold text-blue-800">Paso 2: Encontrar pendiente de L3</h4>
                            <MathRenderer expression="kx + 10y - 8 = 0 \implies 10y = -kx + 8 \implies y = -\frac{k}{10}x + \frac{4}{5}" />
                            <p>Pendiente <MathRenderer inline expression="m_3 = -\frac{k}{10}" /></p>
                        </div>

                        <div className="step">
                            <h4 className="font-bold text-blue-800">Paso 3: Aplicar Condición de Perpendicularidad</h4>
                            <p>Dos rectas son perpendiculares si el producto de sus pendientes es -1:</p>
                            <MathRenderer expression="m_1 \cdot m_3 = -1" />
                            <MathRenderer expression="\left(-\frac{2}{5}\right) \cdot \left(-\frac{k}{10}\right) = -1" />
                            <MathRenderer expression="\frac{2k}{50} = -1 \implies \frac{k}{25} = -1 \implies k = -25" />
                        </div>

                        <div className="bg-white p-4 rounded border border-blue-200 text-center">
                            <span className="font-bold text-xl text-blue-900">Respuesta: k = -25</span>
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
};
