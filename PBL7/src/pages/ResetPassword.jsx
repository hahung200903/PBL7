import { useState } from 'react';
import { FaBriefcase, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import '../index.css';
import './ResetPassword.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log({ newPassword, confirmPassword });
  };

  return (
    <div className="reset-container">
      <div className="reset-form-container">
        <div className="reset-header">
          <div className="logo">
            <FaBriefcase className="briefcase-icon" />
            <h2>Job Application Ranking System</h2>
          </div>
        </div>

        <div className="reset-form">
          <h1>Reset Password</h1>
          <p className="reset-description">
            Duis luctus interdum metus, ut consectetur ante consectetur sed.
            Suspendisse euismod viverra massa sit amet mollis.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group password-group">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-group password-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="reset-button">
              Reset Password <FaArrowRight />
            </button>
          </form>
        </div>
      </div>

      <div className="checkered-background"></div>
    </div>
  );
}

export default ResetPassword; 