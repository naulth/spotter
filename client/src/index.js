import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {createRoot} from 'react-dom/client';

import {UserProvider} from "./Context/user"

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
);
