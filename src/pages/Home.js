import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToDashboard = () => {
    if (!user) return;
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'manager') navigate('/manager');
    else navigate('/user');
  };

  const features = [
    'Secure JWT token-based authentication',
    'Three role levels: User, Manager, and Admin',
    'Protected routes with role-based authorization',
    'Responsive design with clean CSS'
  ];

  return (
    <div className="home-page">
      <nav className="home-nav">
        <span className="home-nav-brand">JWT Auth</span>
        <div className="home-nav-actions">
          {user ? (
            <button className="home-nav-btn home-nav-dashboard" onClick={goToDashboard}>
              Dashboard
            </button>
          ) : (
            <>
              <button className="home-nav-btn home-nav-login" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="home-nav-btn home-nav-register" onClick={() => navigate('/register')}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="home-main">
        <h1 className="home-title">JWT Authentication System</h1>
        <p className="home-subtitle">Role-Based Access Control with MERN Stack</p>

        <div className="home-features-card">
          <h2 className="home-features-title">Features</h2>
          <ul className="home-features-list">
            {features.map((feature, i) => (
              <li key={i} className="home-feature-item">
                <span className="home-check">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="home-cta-buttons">
          <button className="home-cta-btn home-cta-login" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="home-cta-btn home-cta-register" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
