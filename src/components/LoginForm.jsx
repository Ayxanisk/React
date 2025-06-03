import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'admin@example.com' && password === 'admin') {
            onLogin();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#FEF8F2]">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
