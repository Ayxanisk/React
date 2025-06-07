// src/components/LanguageSelector.jsx
import React, { useState, useEffect } from 'react';

const LanguageSelector = () => {
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="az">AZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </select>
    );
};

export default LanguageSelector;
