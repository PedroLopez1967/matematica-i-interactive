import React from 'react';
import { InequalitySolver } from '../components/objectives/I3/InequalitySolver';
import { SetOperations } from '../components/objectives/I3/SetOperations';

export const ObjectiveI3: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Objective I.3</h1>
                <p className="text-gray-600">Inequalities and Set Theory</p>
            </div>

            <InequalitySolver />
            <SetOperations />
        </div>
    );
};
