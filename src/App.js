import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Support from './components/Support';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import './components/style/App.css';

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) setIsLoggedIn(true);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (email && password) setIsLoggedIn(true);
    };

    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setUser(decoded);
        setIsLoggedIn(true);
    };

    return (
        <GoogleOAuthProvider clientId="205196465877-0neriok38upulqssmrufdpnj5cb60486.apps.googleusercontent.com">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <div>
                                    <header>
                                        <div className="logo">
                                            <Link to="/">
                                                <img src="/84c22203-25aa-4e04-9930-5243dc2d3c2d.png" width="200"
                                                     height="120" alt="Logo"/>
                                            </Link>
                                        </div>
                                        <nav>
                                            <Link to="/">Home</Link>
                                            <Link to="/support">Support</Link>
                                            <Link to="/about">About Us</Link>
                                        </nav>
                                        <Link to="/profile">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
                                                alt="User"
                                                title="User"
                                                width="48"
                                                height="48"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Link>
                                    </header>

                                    <section className="hero">
                                        <div className="hero-content">
                                            <h1>Welcome {user?.name || email || 'User'}!</h1>
                                            <p>
                                                Connect in real time with the most effective peer-to-peer texting tool
                                                for higher education
                                            </p>
                                            <form>
                                                <input type="email" placeholder="Type your email"/>
                                                <button type="submit">Submit</button>
                                            </form>
                                            <div className="hero-stats">
                                                <span>14k+ Total Courses</span>
                                                <span>700+ Expert Mentors</span>
                                                <span>8k+ Students Globally</span>
                                            </div>
                                        </div>
                                        <div className="hero-image">
                                            <img
                                                src="/image-from-rawpixel-id-12137309-png.png"
                                                alt="user"
                                                width="392"
                                                height="614"
                                            />
                                        </div>
                                    </section>
                                    <section className="brand-logos">
                                        <span>Sprint</span>
                                        <span>Google</span>
                                        <span>
                                        <strong>Gillette</strong>
                                    </span>
                                        <span>Forbes</span>
                                        <span>Etsy</span>
                                    </section>

                                    <section className="education-section">
                                        <h2>Empowering Modern Day Education</h2>
                                        <div className="cards">
                                            <div className="card">
                                                <h3>Teachers</h3>
                                                <p>
                                                    Bring the power of the digital age into your classroom. Enable your
                                                    students to make innovative school projects.
                                                </p>
                                                <button>See more</button>
                                            </div>
                                            <div className="card">
                                                <h3>Students</h3>
                                                <p>
                                                    Get bold and creative with your school assignments. Flipstack allows
                                                    you to unleash your imagination in the easiest possible way.
                                                </p>
                                                <button>See more</button>
                                            </div>
                                            <div className="card">
                                                <h3>Schools</h3>
                                                <p>
                                                    Publish appealing school prospectus, handbooks and admission guides
                                                    to
                                                    inform students, teachers, applicants and parents.
                                                </p>
                                                <button>See more</button>
                                            </div>
                                        </div>
                                    </section>
                                    <footer className="support-footer">
                                        <p>&copy; 2025 Education Inc. All rights reserved.</p>
                                        <p>Contact us: support@education.com</p>
                                    </footer>
                                </div>
                            ) : (
                                <div className="login-container">
                                    <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button type="submit">
                                            {isRegistering ? 'Register' : 'Login'}
                                        </button>
                                    </form>

                                    <div style={{margin: '20px 0'}}>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => {
                                                alert('Login Failed');
                                            }}
                                        />
                                    </div>

                                    <button
                                        onClick={() => setIsRegistering(!isRegistering)}
                                        style={{
                                            marginTop: '10px',
                                            background: 'none',
                                            color: '#000',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {isRegistering
                                            ? 'Already have an account? Login'
                                            : "Don't have an account? Register"}
                                    </button>
                                </div>
                            )
                        }
                    />
                    <Route path="/support" element={<Support />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/profile" element={<Profile user={user} setIsLoggedIn={setIsLoggedIn} />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;
