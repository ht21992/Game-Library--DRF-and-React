import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../static/css/index.css';
import App from './components/App';
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(

    <BrowserRouter>
    <App />
    </BrowserRouter>
);


