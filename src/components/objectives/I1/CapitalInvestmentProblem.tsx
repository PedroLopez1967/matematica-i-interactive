import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../common/Card';
import { Button } from '../../common/Button';
import { MathRenderer } from '../../math/MathRenderer';
import { ProgressBar } from '../../feedback/ProgressBar';
import { useStore } from '../../../store/useStore';
import { motion } from 'framer-motion';

export const CapitalInvestmentProblem: React.FC = () => {
    const { addXP } = useStore();
    const [step, setStep] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    // Problem constants
    const expansionFund = 900;

    // Calculated values for visualization
    const rest = expansionFund * 2; // 1800
    const beforeProduction = rest / 0.4; // 4500 (since 60% spent, 40% remains)
    const initialCapital = beforeProduction / (2 / 3); // 6750 (since 1/3 spent, 2/3 remains)

    const handleCheck = () => {
        setShowSolution(true);
        addXP(50);
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Problema I.1: El Capital del Emprendedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="prose max-w-none">
                    <p>
                        Una emprendedora inicia un negocio con cierto capital.
                        Gasta <MathRenderer inline expression="1/3" /> del mismo en materiales.
                        Del resto, gasta <MathRenderer inline expression="60\%" /> en producción.
                        El resto se divide equitativamente entre una cuenta de ahorros y un fondo de expansión.
                        Si el fondo de expansión tiene <MathRenderer inline expression="900" /> unidades monetarias,
                        ¿cuál era el capital inicial?
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-blue-900 mb-4">Desglose Visual</h3>

                    <div className="space-y-4">
                        {/* Initial Capital Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Capital Inicial</span>
                                {showSolution && <span className="font-bold">{initialCapital}</span>}
                            </div>
                            <div className="h-8 bg-gray-200 rounded-full overflow-hidden flex">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "33.33%" }}
                                    className="bg-red-400 flex items-center justify-center text-xs text-white font-bold"
                                >
                                    Materiales (1/3)
                                </motion.div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "66.67%" }}
                                    className="bg-blue-200 flex flex-col"
                                >
                                    <div className="h-full flex">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "60%" }}
                                            className="bg-orange-400 h-full flex items-center justify-center text-xs text-white font-bold"
                                            transition={{ delay: 0.5 }}
                                        >
                                            Prod (60%)
                                        </motion.div>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "40%" }}
                                            className="bg-green-200 h-full flex"
                                            transition={{ delay: 1 }}
                                        >
                                            <div className="w-1/2 bg-green-500 h-full flex items-center justify-center text-xs text-white border-r border-green-600">
                                                Ahorro
                                            </div>
                                            <div className="w-1/2 bg-green-600 h-full flex items-center justify-center text-xs text-white">
                                                Exp ({expansionFund})
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {showSolution && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 p-6 rounded-xl border border-green-100"
                    >
                        <h3 className="font-bold text-green-800 mb-2">Pasos de la Solución (Trabajando hacia atrás)</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>
                                <strong>Fondo de Expansión:</strong> {expansionFund}. Como es igual a los ahorros,
                                el "Resto" = {expansionFund} × 2 = <strong>{rest}</strong>.
                            </li>
                            <li>
                                <strong>Antes de Producción:</strong> El resto representa el 40% (100% - 60%) del remanente.
                                <br />
                                <MathRenderer expression={`0.40 \\times R = ${rest} \\implies R = \\frac{${rest}}{0.4} = ${beforeProduction}`} />
                            </li>
                            <li>
                                <strong>Capital Inicial:</strong> Este remanente representa 2/3 (1 - 1/3) del total.
                                <br />
                                <MathRenderer expression={`\\frac{2}{3} \\times C = ${beforeProduction} \\implies C = ${beforeProduction} \\times \\frac{3}{2} = ${initialCapital}`} />
                            </li>
                        </ol>
                    </motion.div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                {!showSolution ? (
                    <Button onClick={handleCheck}>Revelar Solución</Button>
                ) : (
                    <Button variant="outline" onClick={() => { setShowSolution(false); }}>Reiniciar</Button>
                )}
            </CardFooter>
        </Card>
    );
};
