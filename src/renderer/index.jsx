// src/renderer/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/style.css';    // если CSS сгенерирован в этом файле

const params = new URLSearchParams(window.location.search);
const role = params.get('role') || 'Guest';

const root = createRoot(document.getElementById('root'));
root.render(<App role={role} />);
