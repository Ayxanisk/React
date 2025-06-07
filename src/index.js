import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Устанавливаем тему по умолчанию из localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();