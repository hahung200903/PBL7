import { useState } from 'react';
import { FaBriefcase, FaArrowRight } from 'react-icons/fa';
import '../index.css';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset request here
    console.log({ email });
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form-container">
        <div className="forgot-header">
          <div className="logo">
            <FaBriefcase className="briefcase-icon" />
            <h2>Job Application Ranking System</h2>
          </div>
        </div>

        <div className="forgot-form">
          <h1>Forget Password</h1>

          <div className="navigation-links">
            <p className="back-link">
              Go back to <a href="#">Sign In</a>
            </p>
            <p className="account-text">
              Don't have account <a href="#" className="create-account">Create Account</a>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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

export default ForgotPassword; 