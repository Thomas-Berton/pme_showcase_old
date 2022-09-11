import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import App from './App';
import './index.css';
import './i18n';


ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App
            />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals();
