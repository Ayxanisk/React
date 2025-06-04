import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAvatar } from './indexedDBUtils';
import './style/Profile.css';

/**
 * Profile component displays user information and allows editing profile details
 * @param {Object} props - Component props
 * @param {Object} props.user - User information object
 * @param {Function} props.setIsLoggedIn - Function to update login state
 * @param {string} props.avatar - User avatar URL
 * @param {Function} props.setAvatar - Function to update avatar
 */
const Profile = ({ user, setIsLoggedIn, avatar, setAvatar }) => {
    const navigate = useNavigate();
    const userId = user?.email || 'defaultUser';

    // State for user description and edit mode
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Load saved description from localStorage
    useEffect(() => {
        const savedDescription = localStorage.getItem(`${userId}_description`);
        if (savedDescription) {
            setDescription(savedDescription);
        }
    }, [userId]);

    // Handle avatar file upload
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

    // Handle user logout
    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/');
    }, [setIsLoggedIn, navigate]);

    // Save user description
    const handleDescriptionSave = useCallback(() => {
        localStorage.setItem(`${userId}_description`, description);
        setIsEditing(false);
    }, [userId, description]);

    // Render profile component
    return (
        <div className="centered-modal-backdrop">
            <div className="centered-profile-container">
                <h1 className="centered-profile-header">Profile</h1>

                <div className="centered-profile-content">
                    {/* Left column - menu */}
                    <div className="centered-profile-menu">
                        <h2>User Menu</h2>
                        <ul>
                            <li>
                                <strong>Profile</strong>
                                <ul>
                                    <li>My Projects</li>
                                    <li>Settings</li>
                                    <li>Help</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Center column - user information */}
                    <div className="centered-profile-user-section">
                        <div className="centered-profile-user-info">
                            <h2>User Information</h2>
                            <p><strong>{user?.name || 'John Doe'}</strong></p>
                            <p>{user?.email || 'john.doe@example.com'}</p>
                        </div>

                        {/* Avatar and upload button */}
                        <div className="centered-profile-avatar-section">
                            <img
                                src={avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144709.png"}
                                alt="User Avatar"
                                className="centered-profile-avatar"
                            />
                            <label htmlFor="avatar-input" className="centered-profile-upload-button">
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
                    </div>

                    {/* Right column - about section and action buttons */}
                    <div className="centered-profile-actions-section">
                        {/* About me section with edit functionality */}
                        <div className="centered-profile-about">
                            <h2>About Me</h2>
                            {isEditing ? (
                                <>
                                    <textarea
                                        className="centered-profile-description-textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Write something about yourself..."
                                        aria-label="About me description"
                                    />
                                    <div className="centered-profile-buttons">
                                        <button 
                                            className="centered-profile-btn centered-profile-save-btn" 
                                            onClick={handleDescriptionSave}
                                            aria-label="Save description"
                                        >
                                            Save
                                        </button>
                                        <button 
                                            className="centered-profile-btn centered-profile-cancel-btn" 
                                            onClick={() => setIsEditing(false)}
                                            aria-label="Cancel editing"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>{description || "No description provided."}</p>
                                    <button 
                                        className="centered-profile-btn centered-profile-edit-btn" 
                                        onClick={() => setIsEditing(true)}
                                        aria-label="Edit description"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="centered-profile-action-buttons">
                            <button 
                                className="centered-profile-btn centered-profile-logout-btn" 
                                onClick={handleLogout}
                                aria-label="Log out"
                            >
                                Log out
                            </button>
                            <button 
                                className="centered-profile-btn centered-profile-back-btn" 
                                onClick={() => navigate('/')}
                                aria-label="Back to home"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
