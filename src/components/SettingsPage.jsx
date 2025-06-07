import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {deleteUserCredentials, saveAvatar, updateUserPassword} from './indexedDBUtils';
import ThemeToggle from "./ThemeToggle";
import './style/SettingsPage.css';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const SettingsPage = ({ user, setIsLoggedIn}) => {
    const navigate = useNavigate();
    const userId = user?.email || 'defaultUser';
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem(`${userId}_theme`);
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme === 'dark' ? 'dark-theme' : '';
        }
    }, [userId]);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
        document.body.style.backgroundColor = theme === 'dark' ? 'var(--bg-color)' : '';
    }, [theme]);

    const handleThemeToggle = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.className = newTheme === 'dark' ? 'dark-theme' : '';
        document.body.style.backgroundColor = newTheme === 'dark' ? 'var(--bg-color)' : '';
    }, [theme]);


    const handleDeleteAccount = useCallback(async () => {
        if (!user || !user.email) {
            alert('User information not available');
            return;
        }

        try {
            await deleteUserCredentials(user.email);
            await saveAvatar(user.email, null);

            localStorage.removeItem('user');
            localStorage.removeItem('email');
            setIsLoggedIn(false);
            navigate('/');
        } catch (err) {
            console.error('Ошибка при удалении аккаунта:', err);
            alert('Не удалось удалить аккаунт');
        }
    }, [user, setIsLoggedIn, navigate]);

    const handlePasswordChange = useCallback(async () => {
        if (!user || !user.email) {
            alert('User information not available');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!newPassword || !passwordRegex.test(newPassword)) {
            setPasswordError('Пароль должен содержать минимум 8 символов, включая заглавную, строчную букву, цифру и спецсимвол');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Пароли не совпадают');
            return;
        }

        try {
            console.log('Starting password change...');
            await updateUserPassword(user.email, newPassword);
            console.log('Password change successful');

            alert('Пароль успешно обновлён');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError('');
        } catch (err) {
            console.error('Full error during password update:', err);
            setPasswordError(`Ошибка при сбросе пароля: ${err.message || 'Неизвестная ошибка'}`);
        }
    }, [user, newPassword, confirmPassword]);

    const handleClose = useCallback(() => {
        navigate('/');
    }, [navigate]);

    if (!user) {
        return (
            <div className="profile-backdrop">
                <div className="profile-container">
                    <h2>User information not available</h2>
                    <button onClick={() => navigate('/')}>Go to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-backdrop">
            <div className="profile-container settings-container">
                <div className="profile-header">
                    <h1>Settings</h1>
                    <button
                        className="profile-close-button"
                        onClick={handleClose}
                        aria-label="Close settings"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="profile-grid">
                    {/* Left Sidebar - User Menu */}
                    <div className="profile-sidebar">
                        <h2>User Menu</h2>
                        <ul className="profile-menu-list">
                            <li className="profile-menu-item">
                                <Link to="/profile">
                                    <PersonIcon fontSize="small" className="menu-icon" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="profile-menu-item active">
                                <SettingsIcon fontSize="small" className="menu-icon" />
                                <span>Settings</span>
                            </li>
                        </ul>
                    </div>

                    <div className="settings-main">
                        <div className="settings-scrollable">
                            <div className="settings-section">
                                <h2>Account Settings</h2>

                                <div className="password-section">
                                    <h3>
                                        <LockIcon fontSize="small" className="section-icon" />
                                        Change Password
                                    </h3>
                                    <div className="password-inputs">
                                        <TextField
                                            label="New Password"
                                            type={showPassword ? 'text' : 'password'}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={newPassword}
                                            className="password-input"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <TextField
                                            label="Confirm Password"
                                            type={showPassword ? 'text' : 'password'}
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={confirmPassword}
                                            className="password-input"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <button
                                            className="profile-btn password-btn"
                                            onClick={handlePasswordChange}
                                        >
                                            <LockIcon fontSize="small" className="button-icon" />
                                            Change Password
                                        </button>
                                    </div>
                                    {passwordError && <p className="error-message">{passwordError}</p>}
                                </div>

                                <div className="delete-section">
                                    <h3>
                                        <DeleteIcon fontSize="small" className="section-icon" />
                                        Delete Account
                                    </h3>
                                    <p className="warning-text">
                                        <WarningIcon fontSize="small" className="warning-icon" />
                                        Permanently delete your account and all of your content.
                                    </p>
                                    <p className="warning-text strong">
                                        <WarningIcon fontSize="small" className="warning-icon" />
                                        This action cannot be undone. All your data will be permanently removed.
                                    </p>

                                    {!showDeleteConfirm ? (
                                        <button
                                            className="profile-btn delete-btn"
                                            onClick={() => setShowDeleteConfirm(true)}
                                        >
                                            <DeleteIcon fontSize="small" className="button-icon" />
                                            Delete Account
                                        </button>
                                    ) : (
                                        <div className="delete-confirmation">
                                            <p>
                                                <WarningIcon fontSize="small" className="warning-icon" />
                                                Are you sure you want to delete your account?
                                            </p>
                                            <div className="confirmation-buttons">
                                                <button
                                                    className="profile-btn confirm-delete-btn"
                                                    onClick={handleDeleteAccount}
                                                >
                                                    <CheckIcon fontSize="small" className="button-icon" />
                                                    Yes, Delete Account
                                                </button>
                                                <button
                                                    className="profile-btn cancel-delete-btn"
                                                    onClick={() => setShowDeleteConfirm(false)}
                                                >
                                                    <CancelIcon fontSize="small" className="button-icon" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="settings-section">
                                <h2>Preferences</h2>
                                <div className="theme-section">
                                    <h3>Theme</h3>
                                    <p>Switch between light and dark themes</p>
                                    <div className="theme-toggle-container">
                                        <span>Light Mode</span>
                                        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;