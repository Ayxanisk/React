import React from 'react';
import { Link } from 'react-router-dom';
import './style/AboutUs.css';

const AboutUs = () => {
    return (
        <div>
            <header>
                <div className="logo">
                    <Link to="/">
                        <img src="/84c22203-25aa-4e04-9930-5243dc2d3c2d.png" width="200" height="120"/>
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

            <section className="about-intro">
                <div className="about-text">
                    <h1>About Our Platform</h1>
                    <p>
                        We are committed to providing high-quality educational content and support to
                        learners around the world. Our mission is to make education accessible,
                        engaging, and effective for everyone.
                    </p>
                </div>
                <div className="about-image">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="About"
                        width="320"
                    />
                </div>
            </section>

            <section className="contact-section">
                <h2>Contact Us</h2>
                <div className="social-links">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                            alt="Instagram"
                            width="40"
                        />
                        @education_platform
                    </a>
                    <a href="https://t.me/education_platform" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                            alt="Telegram"
                            width="40"
                        />
                        t.me/education_platform
                    </a>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                            alt="WhatsApp"
                            width="40"
                        />
                        +1 (234) 567-890
                    </a>
                </div>
            </section>

            <footer className="support-footer">
                <p>&copy; 2025 Education Inc. All rights reserved.</p>
                <p>Contact us: support@education.com</p>
            </footer>
        </div>
    );
};

export default AboutUs;
