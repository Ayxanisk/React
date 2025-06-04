import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAvatar } from './indexedDBUtils';
import './style/Profile.css';

const Profile = ({ user, setIsLoggedIn, avatar, setAvatar }) => {
    const navigate = useNavigate();
    const userId = user?.email || 'defaultUser';

    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedDescription = localStorage.getItem(`${userId}_description`);
        if (savedDescription) {
            setDescription(savedDescription);
        }
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            setAvatar(reader.result);
            await saveAvatar(userId, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/');
    };

    const handleDescriptionSave = () => {
        localStorage.setItem(`${userId}_description`, description);
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <p className="profile-subtitle">Manage your profile</p>

            <div className="profile-card">
                <div className="profile-about">
                    <h2>About Me</h2>
                    {isEditing ? (
                        <>
                            <textarea
                                className="description-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button className="btn save-btn" onClick={handleDescriptionSave}>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <p>{description || "No description provided."}</p>
                            <button className="btn edit-btn" onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                        </>
                    )}
                    <div className="credit">Your personal space</div>
                </div>
                <div className="profile-avatar-section">
                    <img
                        src={avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144709.png"}
                        alt="User Avatar"
                        className="profile-avatar"
                    />
                    <label htmlFor="avatar-input" className="upload-button">
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

                {/* Right — Info */}
                <div className="profile-info">
                    <h2>User Info</h2>
                    <p><strong>Email:</strong> {user?.email || 'Google User'}</p>
                    <p><strong>Name:</strong> {user?.name || 'Google User'}</p>
                    <div className="profile-actions">
                        <button className="btn logout-btn" onClick={handleLogout}>Log out</button>
                        <button className="btn back-btn" onClick={() => navigate('/')}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
