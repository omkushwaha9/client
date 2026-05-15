import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import './AdminDashboard.css';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/manager')
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  const stats = data?.stats || { teamMembers: 10, activeProjects: 8, pendingApprovals: 4 };
  const activities = data?.recentActivities || [
    { text: 'Approved project proposal from Team A' },
    { text: 'Reviewed performance reports' },
    { text: 'Scheduled team meeting for next week' },
    { text: 'Assigned new tasks to team members' }
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-content">

        <div className="manager-banner">
          <h1>Manager Dashboard</h1>
          <p>Welcome, {user?.name}! Manage your team efficiently.</p>
        </div>

        <div className="stats-row manager-stats">
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Team Members</span>
              <span className="stat-number">{stats.teamMembers}</span>
            </div>
            <span className="stat-icon">👥</span>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Active Projects</span>
              <span className="stat-number">{stats.activeProjects}</span>
            </div>
            <span className="stat-icon">📊</span>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Pending Approvals</span>
              <span className="stat-number">{stats.pendingApprovals}</span>
            </div>
            <span className="stat-icon">⏳</span>
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <h3 className="card-heading">📋 Recent Activities</h3>
            {activities.map((a, i) => (
              <div key={i} className="activity-item">
                <span className="activity-dot">•</span>
                <p className="activity-text">{a.text}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="card-heading">👤 Manager Information</h3>
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
                <span className="role-badge admin-badge">{user?.role === 'admin' ? 'Admin' : 'Manager'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="alert-box info">
          ℹ️ <strong>Manager Access Level:</strong> You can manage team members, approve requests, and oversee projects.
        </div>

        <div className="btn-row">
          <button className="dash-btn blue-btn" onClick={() => navigate('/user')}>View User Dashboard</button>
          {user?.role === 'admin' && (
            <button className="dash-btn red-btn" onClick={() => navigate('/admin')}>Go to Admin Dashboard</button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;
