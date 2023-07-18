import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {createRoot} from 'react-dom/client';

import {UserProvider} from "./Context/user"
import { ExercisesProvider } from './Context/exercises';
import { ExerciseProvider } from './Context/exercise';


const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        
        <ExercisesProvider>
        <ExerciseProvider>
        <UserProvider>
            <App />
        </UserProvider>
        </ExerciseProvider>
        </ExercisesProvider>
        
    </BrowserRouter>
);
