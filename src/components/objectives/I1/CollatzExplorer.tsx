import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { Button } from '../../common/Button';
import { getCollatzSequence } from '../../../utils/mathHelpers';
import { motion } from 'framer-motion';

export const CollatzExplorer: React.FC = () => {
    const [input, setInput] = useState<string>('7');
    const [sequence, setSequence] = useState<number[]>([]);


    const handleSimulate = () => {
        const num = parseInt(input);
        if (isNaN(num) || num < 1) return;

        const seq = getCollatzSequence(num);
        setSequence(seq);

    };

    return (
        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Problema I.1: Explorador de Secuencia de Collatz</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-6">
                    <input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-32"
                        placeholder="Número inicial"
                    />
                    <Button onClick={handleSimulate}>Explorar Secuencia</Button>
                </div>

                {sequence.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {sequence.map((num, i) => (
                                <motion.div
                                    key={`${num}-${i}`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`
                    w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-sm
                    ${num % 2 === 0 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}
                    ${num === 1 ? 'bg-green-500 text-white ring-4 ring-green-200' : ''}
                  `}
                                >
                                    {num}
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                            <p><strong>Pasos:</strong> {sequence.length - 1}</p>
                            <p><strong>Valor Máximo:</strong> {Math.max(...sequence)}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
