import React from 'react';

const Hero = () => (
    <section className="hero">
        <div className="hero-content">
            <h1>It's Now Easier to Get Quality Education</h1>
            <p>Connect in real time with the most effective peer-to-peer texting tool for higher education</p>
            <form>
                <input type="email" placeholder="Type your email" />
                <button type="submit">Submit</button>
            </form>
            <div className="hero-stats">
                <span>14k+ Total Courses</span>
                <span>700+ Expert Mentors</span>
                <span>8k+ Students Globally</span>
            </div>
        </div>
        <div className="hero-image">
            <img src="https://i.imgur.com/SXK9B2f.png" alt="Instructor" width="300" />
        </div>
    </section>
);

export default Hero;