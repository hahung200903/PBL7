import { useState } from 'react';
import { FaBriefcase, FaArrowRight } from 'react-icons/fa';
import '../index.css';
import './EmailVerification.css';

function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const email = 'emailaddress@gmail.com'; // This would come from a context or props in a real app

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification logic here
    console.log({ verificationCode });
  };

  const handleResend = (e) => {
    e.preventDefault();
    // Handle resend logic here
    console.log('Resending verification code');
  };

  return (
    <div className="verification-container">
      <div className="verification-content">
        {/* Logo */}
        <div className="verification-logo">
          <FaBriefcase className="briefcase-icon" />
          <h2>Job Application Ranking System</h2>
        </div>

        <div className="verification-form-container">
          <h1>Email Verification</h1>

          <p className="verification-message">
            We've sent an verification to <span className="email-highlight">{email}</span> to verify your
            email address and activate your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="verification-input"
              />
            </div>

            <button type="submit" className="verification-button">
              Verify My Account <FaArrowRight />
            </button>
          </form>

          <p className="resend-text">
            Didn't recieve any code! <a href="#" onClick={handleResend} className="resend-link">Resends</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification; 