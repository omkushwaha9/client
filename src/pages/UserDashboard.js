import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import './AdminDashboard.css';
import './ManagerDashboard.css';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ tasksCompleted: 12, tasksPending: 5, totalTasks: 17 });

  useEffect(() => {
    API.get('/user')
      .then((res) => setStats(res.data.stats))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-content">

        <div className="card user-welcome-card">
          <h2 className="user-welcome-title">Welcome back, {user?.name}! 👋</h2>
          <p className="user-welcome-sub">Here's an overview of your account and tasks.</p>
        </div>

        <div className="user-task-card card">
          <h3 className="card-heading">📌 My Tasks</h3>
          <div className="task-stats">
            <div className="task-stat">
              <span className="task-stat-num completed">{stats.tasksCompleted}</span>
              <span className="task-stat-label">Completed</span>
            </div>
            <div className="task-stat">
              <span className="task-stat-num pending">{stats.tasksPending}</span>
              <span className="task-stat-label">Pending</span>
            </div>
            <div className="task-stat">
              <span className="task-stat-num total">{stats.totalTasks}</span>
              <span className="task-stat-label">Total Tasks</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-heading">👤 User Information</h3>
          <div className="info-vertical">
            <div className="info-field-v">
              <span className="info-label-v">Name</span>
              <span className="info-value-v">{user?.name}</span>
            </div>
            <div className="info-field-v">
              <span className="info-label-v">Email</span>
              <span className="info-value-v">{user?.email}</span>
            </div>
            <div className="info-field-v">
              <span className="info-label-v">Role</span>
              <span className="role-badge user-badge">User</span>
            </div>
          </div>
        </div>

        <div className="alert-box info">
          ℹ️ <strong>User Access Level:</strong> You have standard user access. Contact your manager for elevated permissions.
        </div>

        <div className="btn-row">
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <button className="dash-btn purple-btn" onClick={() => navigate('/manager')}>View Manager Dashboard</button>
          )}
          {user?.role === 'admin' && (
            <button className="dash-btn blue-btn" onClick={() => navigate('/admin')}>Go to Admin Dashboard</button>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
