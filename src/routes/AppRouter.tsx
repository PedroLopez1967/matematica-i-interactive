import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { Objectives } from '../pages/Objectives';
import { Progress } from '../pages/Progress';
import { Playground } from '../pages/Playground';
import { ObjectiveI1 } from '../pages/ObjectiveI1';
import { ObjectiveI2 } from '../pages/ObjectiveI2';
import { ObjectiveI3 } from '../pages/ObjectiveI3';
import { ObjectiveII1 } from '../pages/ObjectiveII1';
import { ScenarioProvider } from '../components/scenarios/ScenarioManager';

export const AppRouter: React.FC = () => {
    return (
        <ScenarioProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="objectives" element={<Objectives />} />
                        <Route path="progress" element={<Progress />} />
                        <Route path="playground" element={<Playground />} />
                        <Route path="objectives/I.1" element={<ObjectiveI1 />} />
                        <Route path="objectives/I.2" element={<ObjectiveI2 />} />
                        <Route path="objectives/I.3" element={<ObjectiveI3 />} />
                        <Route path="objectives/II.1" element={<ObjectiveII1 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ScenarioProvider>
    );
};
