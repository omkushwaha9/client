import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 100, totalManagers: 15, totalAdmins: 3, systemHealth: 'Good' });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    API.get('/admin')
      .then((res) => {
        setStats(res.data.stats);
        setActivities(res.data.recentActivities);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-content">

        <div className="admin-banner">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}! You have full system control.</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Users</span>
              <span className="stat-number">{stats.totalUsers}</span>
            </div>
            <span className="stat-icon">👤</span>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Managers</span>
              <span className="stat-number">{stats.totalManagers}</span>
            </div>
            <span className="stat-icon">👥</span>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Admins</span>
              <span className="stat-number">{stats.totalAdmins}</span>
            </div>
            <span className="stat-icon">⚡</span>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">System Health</span>
              <span className="stat-number health-good">{stats.systemHealth}</span>
            </div>
            <span className="stat-icon">✅</span>
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <h3 className="card-heading">🔧 Admin Actions</h3>
            <div className="action-item blue">
              <span className="action-title">Manage Users</span>
              <span className="action-desc">Add, edit, or remove users</span>
            </div>
            <div className="action-item purple">
              <span className="action-title">System Settings</span>
              <span className="action-desc">Configure system preferences</span>
            </div>
            <div className="action-item green">
              <span className="action-title">View Logs</span>
              <span className="action-desc">Access system audit logs</span>
            </div>
            <div className="action-item red">
              <span className="action-title">Security Settings</span>
              <span className="action-desc">Manage security configurations</span>
            </div>
          </div>

          <div className="card">
            <h3 className="card-heading">🗂 Recent Admin Activities</h3>
            {activities.length > 0 ? (
              activities.map((a, i) => (
                <div key={i} className="activity-item">
                  <span className="activity-dot">•</span>
                  <div>
                    <p className="activity-text">{a.text}</p>
                    {a.time && <small className="activity-time">{a.time}</small>}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="activity-item"><span className="activity-dot">•</span><div><p className="activity-text">User account created</p><small className="activity-time">2 hours ago</small></div></div>
                <div className="activity-item"><span className="activity-dot">•</span><div><p className="activity-text">System backup completed</p><small className="activity-time">3 hours ago</small></div></div>
                <div className="activity-item"><span className="activity-dot">•</span><div><p className="activity-text">Security patch applied</p><small className="activity-time">1 day ago</small></div></div>
                <div className="activity-item"><span className="activity-dot">•</span><div><p className="activity-text">Database optimized</p><small className="activity-time">2 days ago</small></div></div>
              </>
            )}
          </div>
        </div>

        <div className="card info-card">
          <h3 className="card-heading">Admin Information</h3>
          <div className="info-row">
            <div className="info-field"><span className="info-label">Name:</span><span className="info-value">{user?.name}</span></div>
            <div className="info-field"><span className="info-label">Email:</span><span className="info-value">{user?.email}</span></div>
            <div className="info-field"><span className="info-label">Role:</span><span className="role-badge admin-badge">Admin</span></div>
          </div>
        </div>

        <div className="alert-box warning">
          ⚠️ <strong>Admin Access Level:</strong> You have complete access to all system features, user management, and configurations. Use this power responsibly.
        </div>

        <div className="btn-row">
          <button className="dash-btn blue-btn" onClick={() => navigate('/user')}>View User Dashboard</button>
          <button className="dash-btn purple-btn" onClick={() => navigate('/manager')}>View Manager Dashboard</button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
