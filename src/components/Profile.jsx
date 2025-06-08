import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAvatar } from './indexedDBUtils';
import './style/Profile.css';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Profile = ({ user, setIsLoggedIn, avatar, setAvatar, updateUserName }) => {
    const navigate = useNavigate();
    const userId = user?.email || 'defaultUser';
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(user?.name || '');
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        const savedDescription = localStorage.getItem(`${userId}_description`);
        const savedName = localStorage.getItem(`${userId}_name`);
        if (savedDescription) setDescription(savedDescription);
        if (savedName) setNewName(savedName);
    }, [userId]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            setAvatar(reader.result);
            await saveAvatar(userId, reader.result);
        };
        reader.readAsDataURL(file);
    }, [userId, setAvatar]);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/');
    }, [setIsLoggedIn, navigate]);

    const handleDescriptionSave = useCallback(() => {
        localStorage.setItem(`${userId}_description`, description);
        setIsEditing(false);
    }, [userId, description]);

    const handleNameSave = useCallback(async () => {
        if (!newName.trim()) {
            setNameError('Name cannot be empty');
            return;
        }

        if (newName.length > 30) {
            setNameError('Name is too long (max 30 characters)');
            return;
        }

        try {
            await updateUserName(user.email, newName);
            localStorage.setItem(`${userId}_name`, newName);
            setIsEditingName(false);
            setNameError('');
        } catch (error) {
            console.error('Failed to update name:', error);
            setNameError('Failed to save name. Please try again.');
        }
    }, [newName, user.email, updateUserName, userId]);

    const handleClose = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <div className="profile-backdrop">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Profile</h1>
                    <button
                        className="profile-close-button"
                        onClick={handleClose}
                        aria-label="Close profile"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="profile-grid">
                    <div className="profile-sidebar">
                        <h2>User Menu</h2>
                        <ul className="profile-menu-list">
                            <li className="profile-menu-item active">
                                <PersonIcon fontSize="small" className="menu-icon" />
                                <span>Profile</span>
                            </li>
                            <li className="profile-menu-item">
                                <Link to="/settings">
                                    <SettingsIcon fontSize="small" className="menu-icon" />
                                    <span>Settings</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="profile-main">
                        <div className="profile-section">
                            <h2>User Information</h2>
                            <div className="user-info-card">
                                <div className="avatar-section">
                                    <img
                                        src={avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144709.png"}
                                        alt="User Avatar"
                                        className="profile-avatar"
                                    />
                                    <label htmlFor="avatar-input" className="avatar-upload-button">
                                        <PhotoCameraIcon fontSize="small" className="button-icon" />
                                        Change Avatar
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar-input"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className="user-details">
                                    {isEditingName ? (
                                        <div className="name-edit-container">
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                className="name-input"
                                                placeholder="Enter your name"
                                                maxLength={30}
                                            />
                                            <div className="edit-buttons">
                                                <button
                                                    className="profile-btn save-btn"
                                                    onClick={handleNameSave}
                                                >
                                                    <CheckCircleIcon fontSize="small" className="button-icon" />
                                                    Save
                                                </button>
                                                <button
                                                    className="profile-btn cancel-btn"
                                                    onClick={() => {
                                                        setIsEditingName(false);
                                                        setNewName(user?.name || '');
                                                        setNameError('');
                                                    }}
                                                >
                                                    <CancelIcon fontSize="small" className="button-icon" />
                                                    Cancel
                                                </button>
                                            </div>
                                            {nameError && (
                                                <p className="error-message">
                                                    <ErrorIcon fontSize="small" className="error-icon" />
                                                    {nameError}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="name-display">
                                            <p className="user-name">{newName || 'John Doe'}</p>
                                            <button
                                                className="edit-name-button"
                                                onClick={() => setIsEditingName(true)}
                                                aria-label="Edit name"
                                            >
                                                <EditIcon fontSize="small" />
                                            </button>
                                        </div>
                                    )}
                                    <p className="user-email">{user?.email || 'john.doe@example.com'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="profile-section">
                            <h2>About Me</h2>
                            <div className="about-section">
                                {isEditing ? (
                                    <>
                                        <textarea
                                            className="profile-description-textarea"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Write something about yourself..."
                                            maxLength={500}
                                        />
                                        <div className="edit-buttons">
                                            <button
                                                className="profile-btn save-btn"
                                                onClick={handleDescriptionSave}
                                            >
                                                <SaveIcon fontSize="small" className="button-icon" />
                                                Save
                                            </button>
                                            <button
                                                className="profile-btn cancel-btn"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                <CancelIcon fontSize="small" className="button-icon" />
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="description-text">{description || "No description provided."}</p>
                                        <button
                                            className="profile-btn edit-btn"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <EditIcon fontSize="small" className="button-icon" />
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="profile-section">
                            <button className="profile-btn logout-btn" onClick={handleLogout}>
                                <ExitToAppIcon fontSize="small" className="button-icon" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;