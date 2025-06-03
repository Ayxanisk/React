import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Profile.css';

const Profile = ({ user, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="profile-overlay">
            <div className="profile-modal">
                <h2>Профиль пользователя</h2>
                <p><strong>Email:</strong> {user?.email || 'Google User'}</p>
                {user?.name && <p><strong>Имя:</strong> {user.name}</p>}
                <div className="profile-buttons">
                    <button onClick={handleLogout}>Выйти</button>
                    <button onClick={() => navigate('/')}>Назад</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
