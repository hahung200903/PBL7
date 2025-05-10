import { useState } from 'react';
import {
  FaBriefcase,
  FaSignOutAlt,
  FaTachometerAlt,
  FaLayerGroup,
  FaCog,
  FaUserFriends,
  FaFileAlt,
  FaCheckCircle,
  FaPlus
} from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  // Dummy data for sessions
  const sessions = [
    { id: 1, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 2, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 3, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 4, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 5, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 6, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 7, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 8, name: 'AI Resume', description: true, resumeCount: 18 },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <FaBriefcase className="briefcase-icon" />
          <h2>Job Application Ranking System</h2>
        </div>
        <div className="user-info">
          <span>Huynh Duy Tin</span>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <FaTachometerAlt className="nav-icon" />
                  <span>DASHBOARD</span>
                </a>
              </li>
              <li className="nav-item active">
                <a href="#" className="nav-link">
                  <FaLayerGroup className="nav-icon" />
                  <span>Working Sessions</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <FaCog className="nav-icon" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="logout-section">
            <a href="#" className="logout-link">
              <FaSignOutAlt className="logout-icon" />
              <span>Log-out</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="main-header">
            <h2>Recently Session</h2>
            <button className="add-session-btn">
              <span>Add Session</span>
            </button>
          </div>

          {/* Sessions Table */}
          <div className="sessions-table-container">
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Name Working Session</th>
                  <th>Job Description</th>
                  <th>Resumes</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.name}</td>
                    <td className="description-cell">
                      {session.description && <FaCheckCircle className="check-icon" />}
                    </td>
                    <td>{session.resumeCount} Resumes</td>
                    <td className="actions-cell">
                      <button className="action-btn">
                        <FaUserFriends className="action-icon" />
                      </button>
                      <button className="action-btn">
                        <FaFileAlt className="action-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2025 Job Application Ranking System</p>
      </footer>
    </div>
  );
}

export default Dashboard; 