import { useState } from 'react';
import {
  FaBriefcase,
  FaLayerGroup,
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
  FaTrash,
  FaInstagram
} from 'react-icons/fa';
import './UploadFiles.css';

function UploadFiles() {
  // Dummy data for resume files
  const [resumeFiles, setResumeFiles] = useState([
    { id: 1, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 2, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 3, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 4, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 5, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 6, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 7, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 8, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 9, name: 'Name File PDF.pdf', size: '12.9 Mb' }
  ]);

  // Dummy data for job description file
  const [jobDescFile, setJobDescFile] = useState([
    { id: 1, name: 'Name File PDF.pdf', size: '12.9 Mb' }
  ]);

  const handleDeleteResumeFile = (id) => {
    setResumeFiles(resumeFiles.filter(file => file.id !== id));
  };

  const handleDeleteJobDescFile = (id) => {
    setJobDescFile(jobDescFile.filter(file => file.id !== id));
  };

  const handleResumeUpload = (e) => {
    console.log('Resume file uploaded');
    // Handle resume file upload logic
  };

  const handleJobDescUpload = (e) => {
    console.log('Job description file uploaded');
    // Handle job description file upload logic
  };

  return (
    <div className="upload-container">
      {/* Header */}
      <header className="upload-header">
        <div className="logo">
          <FaBriefcase className="briefcase-icon" />
          <h2>Job Application Ranking System</h2>
        </div>
        <div className="social-links">
          <a href="#" className="social-link">
            <FaInstagram className="instagram-icon" />
          </a>
        </div>
      </header>

      <div className="upload-content">
        {/* Sidebar */}
        <aside className="upload-sidebar">
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
        <main className="upload-main">
          <div className="session-header">
            <h2>Name Session</h2>
            <div className="action-buttons">
              <button className="back-btn">Back</button>
              <button className="ranking-btn">Ranking</button>
            </div>
          </div>

          <div className="upload-sections">
            {/* Resumes Section */}
            <div className="upload-section">
              <div className="section-header">
                <h3>All resumes ({resumeFiles.length})</h3>
                <button
                  className="upload-btn"
                  onClick={handleResumeUpload}
                >
                  Upload
                </button>
              </div>
              <div className="files-container">
                {resumeFiles.map(file => (
                  <div key={file.id} className="file-item">
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{file.size}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteResumeFile(file.id)}
                    >
                      Delete file <FaTrash className="trash-icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Description Section */}
            <div className="upload-section">
              <div className="section-header">
                <h3>Job Description ({jobDescFile.length}/1)</h3>
                <button
                  className="upload-btn"
                  onClick={handleJobDescUpload}
                >
                  Upload
                </button>
              </div>
              <div className="files-container">
                {jobDescFile.map(file => (
                  <div key={file.id} className="file-item">
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{file.size}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteJobDescFile(file.id)}
                    >
                      Delete file <FaTrash className="trash-icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="upload-footer">
        <p>© 2025 Job Application Ranking System</p>
      </footer>
    </div>
  );
}

export default UploadFiles; 