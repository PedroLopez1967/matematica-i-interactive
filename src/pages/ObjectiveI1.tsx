import React from 'react';
import { CapitalInvestmentProblem } from '../components/objectives/I1/CapitalInvestmentProblem';
import { CollatzExplorer } from '../components/objectives/I1/CollatzExplorer';

export const ObjectiveI1: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Objetivo I.1</h1>
                <p className="text-gray-600">Sistemas Numéricos y Operaciones</p>
            </div>

            <CapitalInvestmentProblem />
            <CollatzExplorer />
        </div>
    );
};
