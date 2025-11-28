import React from 'react';
import { RadicalSimplifier } from '../components/objectives/I2/RadicalSimplifier';
import { ShadedAreaCalculator } from '../components/objectives/I2/ShadedAreaCalculator';

export const ObjectiveI2: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Objective I.2</h1>
                <p className="text-gray-600">Radicals and Geometry</p>
            </div>

            <RadicalSimplifier />
            <ShadedAreaCalculator />
        </div>
    );
};
