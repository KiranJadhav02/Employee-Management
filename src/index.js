import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// font-awesome

import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

// bootstrap css

import '../node_modules/bootstrap/dist/css/bootstrap.css'

// bootstrap js

import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

