import React from 'react';
import { Switch } from '@mui/material';

const ThemeToggle = ({ theme, onToggle }) => {
    return (
        <Switch
            checked={theme === 'dark'}
            onChange={onToggle}
            color="primary"
            inputProps={{ 'aria-label': 'toggle theme' }}
            sx={{
                '& .MuiSwitch-thumb': {
                    backgroundColor: theme === 'dark' ? 'var(--primary-color)' : '#fff',
                },
                '& .MuiSwitch-track': {
                    backgroundColor: theme === 'dark' ? 'var(--card-bg)' : 'var(--primary-color)',
                },
            }}
        />
    );
};

export default ThemeToggle;