import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const user = useSelector((state) => state.session.user); // Fetch logged-in user
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to BloomBook</h1>
        <p className="tagline">Empowering Your Personal Growth Journey</p>
        {!user && (
          <button className="auth-btn" onClick={() => navigate('/signup')}>
            Join Now
          </button>
        )}
      </header>

      <main className="home-main">
        {!user ? (
          <div className="guest-content">
            <h2>Start Your Growth Journey Today</h2>
            <p>
              Track your progress, reflect on your growth, and achieve your goals with BloomBook. 
              Your personal growth starts here!
            </p>
            <button className="auth-btn" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
        ) : (
          <div className="user-content">
            <h2>Welcome Back, {user.firstName || 'User'}!</h2>
            <p>
              Continue your journey of growth and reflection. Check your progress, or dive into your journals!
            </p>
            <div className="dashboard-links">
              <button className="nav-btn" onClick={() => navigate('/growth-tracker')}>
                Growth Tracker
              </button>
              <button className="nav-btn" onClick={() => navigate('/journals')}>
                Journals
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
