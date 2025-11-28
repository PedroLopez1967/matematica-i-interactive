import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { MathInput } from '../components/math/MathInput';
import { NumberLine } from '../components/visualizations/NumberLine';
import { ProgressBar } from '../components/feedback/ProgressBar';
import { HintSystem } from '../components/feedback/HintSystem';
import { Trophy } from 'lucide-react';

export const Playground: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mathValue, setMathValue] = useState('');
    const [progress, setProgress] = useState(30);
    const [unlockedHints, setUnlockedHints] = useState<string[]>([]);
    const [xp, setXp] = useState(100);

    const hints = [
        { id: 'h1', level: 1, text: 'Try factoring out x first.', cost: 0 },
        { id: 'h2', level: 2, text: 'Use the quadratic formula.', cost: 10 },
        { id: 'h3', level: 3, text: 'The answer is x = 5.', cost: 20 },
    ];

    const handleUnlockHint = (id: string, cost: number) => {
        if (xp >= cost) {
            setUnlockedHints([...unlockedHints, id]);
            setXp(xp - cost);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <h1 className="text-3xl font-bold">Component Playground</h1>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button isLoading>Loading</Button>
                    <Button leftIcon={<Trophy className="w-4 h-4" />}>With Icon</Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Cards</h2>
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">This is the card content. It can contain anything.</p>
                    </CardContent>
                    <CardFooter>
                        <Button size="sm">Action</Button>
                    </CardFooter>
                </Card>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Modal</h2>
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Example Modal"
                >
                    <p>This is a modal window. You can put any content here.</p>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </div>
                </Modal>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Math Input</h2>
                <div className="max-w-md">
                    <MathInput
                        value={mathValue}
                        onChange={setMathValue}
                        label="Equation Solver"
                        placeholder="Type an equation..."
                    />
                    <p className="mt-2 text-sm text-gray-500">Value: {mathValue}</p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Number Line</h2>
                <Card className="p-4">
                    <NumberLine
                        points={[
                            { value: -2, label: 'A', draggable: true },
                            { value: 3.5, label: 'B', color: '#10B981', draggable: true }
                        ]}
                        intervals={[
                            { start: -5, end: 0, color: '#F59E0B', startOpen: true }
                        ]}
                        onChange={(points) => console.log('Points moved:', points)}
                    />
                </Card>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Feedback</h2>
                <div className="max-w-md space-y-4">
                    <ProgressBar value={progress} max={100} label="Progress" showPercentage />
                    <div className="flex gap-2">
                        <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                        <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
                    </div>

                    <div className="mt-8">
                        <p className="mb-2 font-bold">XP: {xp}</p>
                        <HintSystem
                            hints={hints}
                            unlockedHints={unlockedHints}
                            onUnlockHint={handleUnlockHint}
                            userXP={xp}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
