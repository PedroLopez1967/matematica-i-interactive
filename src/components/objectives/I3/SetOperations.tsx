import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../common/Card';
import { Button } from '../../common/Button';
import { MathRenderer } from '../../math/MathRenderer';
import { NumberLine } from '../../visualizations/NumberLine';

export const SetOperations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'A' | 'B' | 'Union' | 'Intersection'>('A');

    // Sets defined in problem
    // A = {x in R / |3x - 1| <= 5} -> -5 <= 3x-1 <= 5 -> -4 <= 3x <= 6 -> -4/3 <= x <= 2
    // B = [-3, 4)

    const setA = { start: -1.33, end: 2, startOpen: false, endOpen: false }; // [-4/3, 2]
    const setB = { start: -3, end: 4, startOpen: false, endOpen: true };    // [-3, 4)

    return (
        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Problema I.3: Operaciones con Conjuntos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <span className="font-bold">Conjunto A: </span>
                        <MathRenderer inline expression="\{x \in \mathbb{R} \mid |3x - 1| \le 5\}" />
                        <br />
                        <span className="text-gray-600">Intervalo: </span>
                        <MathRenderer inline expression="[-\frac{4}{3}, 2]" />
                    </div>
                    <div className="bg-orange-50 p-3 rounded border border-orange-100">
                        <span className="font-bold">Conjunto B: </span>
                        <MathRenderer inline expression="[-3, 4)" />
                    </div>
                </div>

                <div className="flex gap-2 justify-center">
                    {['A', 'B', 'Unión', 'Intersección'].map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === (tab === 'Unión' ? 'Union' : tab === 'Intersección' ? 'Intersection' : tab) ? 'primary' : 'outline'}
                            onClick={() => setActiveTab((tab === 'Unión' ? 'Union' : tab === 'Intersección' ? 'Intersection' : tab) as any)}
                            size="sm"
                        >
                            {tab}
                        </Button>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 min-h-[150px] flex flex-col justify-center">
                    {activeTab === 'A' && (
                        <NumberLine
                            min={-5} max={5}
                            intervals={[{ ...setA, color: '#3B82F6' }]}
                            points={[
                                { value: -1.33, label: '-4/3', color: '#3B82F6' },
                                { value: 2, label: '2', color: '#3B82F6' }
                            ]}
                        />
                    )}
                    {activeTab === 'B' && (
                        <NumberLine
                            min={-5} max={5}
                            intervals={[{ ...setB, color: '#F97316' }]}
                            points={[
                                { value: -3, label: '-3', color: '#F97316' },
                                { value: 4, label: '4', color: '#F97316' } // Open circle handled by interval prop
                            ]}
                        />
                    )}
                    {activeTab === 'Union' && (
                        <NumberLine
                            min={-5} max={5}
                            intervals={[{ start: -3, end: 4, color: '#8B5CF6', startOpen: false, endOpen: true }]}
                            points={[
                                { value: -3, label: '-3', color: '#8B5CF6' },
                                { value: 4, label: '4', color: '#8B5CF6' }
                            ]}
                        />
                    )}
                    {activeTab === 'Intersection' && (
                        <NumberLine
                            min={-5} max={5}
                            intervals={[{ start: -1.33, end: 2, color: '#10B981', startOpen: false, endOpen: false }]}
                            points={[
                                { value: -1.33, label: '-4/3', color: '#10B981' },
                                { value: 2, label: '2', color: '#10B981' }
                            ]}
                        />
                    )}
                </div>

                <div className="text-center text-gray-600">
                    {activeTab === 'Union' && <p>Unión <MathRenderer inline expression="A \cup B = [-3, 4)" /></p>}
                    {activeTab === 'Intersection' && <p>Intersección <MathRenderer inline expression="A \cap B = [-\frac{4}{3}, 2]" /></p>}
                </div>
            </CardContent>
        </Card>
    );
};
