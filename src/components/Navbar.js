import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (role) => {
    if (role === 'admin') return 'Admin';
    if (role === 'manager') return 'Manager';
    return 'User';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">JWT Auth</div>
      {user && (
        <div className="navbar-right">
          <span className="navbar-welcome">
            Welcome, {user.name} ({getRoleLabel(user.role)})
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
