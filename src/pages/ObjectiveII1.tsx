import React from 'react';
import { LinePerpendicularity } from '../components/objectives/II1/LinePerpendicularity';
import { TriangleConstruction } from '../components/objectives/II1/TriangleConstruction';

export const ObjectiveII1: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Objective II.1</h1>
                <p className="text-gray-600">Analytic Geometry</p>
            </div>

            <LinePerpendicularity />
            <TriangleConstruction />
        </div>
    );
};
