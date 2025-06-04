import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './style/Support.css';

const Support = () => {
    const avatar = localStorage.getItem('avatar') || "https://cdn-icons-png.flaticon.com/128/1144/1144709.png";
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div>
            <header>
                <div className="logo">
                    <Link to="/">
                        <img src="/84c22203-25aa-4e04-9930-5243dc2d3c2d.png" width="200" height="120" alt="Logo"/>
                    </Link>
                </div>
                <nav className={menuOpen ? 'nav active' : 'nav'}>
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="nav-link">
                        Home
                    </NavLink>
                    <NavLink to="/support" onClick={() => setMenuOpen(false)}
                             className="nav-link">
                        Support
                    </NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)}
                             className="nav-link">
                        About Us
                    </NavLink>
                </nav>
                <Link to="/profile">
                    <img
                        src={avatar}
                        alt="User"
                        title="User"
                        width="48"
                        height="48"
                        style={{cursor: 'pointer', borderRadius: '50%'}}
                    />
                </Link>
            </header>

            <section className="support-intro">
                <div className="support-text">
                    <h1>Need Help? We're Here for You</h1>
                    <p>
                        Our support team is ready to help you with account issues, technical problems,
                        and anything else you need. Reach out to us using the form below or browse
                        our FAQs.
                    </p>
                </div>
                <div className="support-image">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2957/2957019.png"
                        alt="Support"
                        width="320"
                    />
                </div>
            </section>

            <section className="support-form-section">
                <h2>Contact Support</h2>
                <form className="support-form">
                    <input type="text" placeholder="Your name" required />
                    <input type="email" placeholder="Your email" required />
                    <textarea placeholder="Describe your issue..." required />
                    <button type="submit">Send Message</button>
                </form>
            </section>

            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>How do I reset my password?</h3>
                        <p>You can reset your password from the login screen by clicking "Forgot password".</p>
                    </div>
                    <div className="faq-item">
                        <h3>How can I change my email address?</h3>
                        <p>Go to account settings and click "Change email" under your profile section.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Why can’t I access some courses?</h3>
                        <p>
                            Some courses may be restricted to paid users or may require special
                            access.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="support-footer">
                <p>&copy; 2025 Education Inc. All rights reserved.</p>
                <p>Contact us: support@education.com</p>
            </footer>
        </div>
    );
};

export default Support;
