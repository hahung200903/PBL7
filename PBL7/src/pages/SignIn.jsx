import { useState } from 'react';
import { FaBriefcase, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import '../index.css';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <div className="signin-header">
          <div className="logo">
            <FaBriefcase className="briefcase-icon" />
            <h2>Job Application Ranking System</h2>
          </div>
        </div>

        <div className="signin-form">
          <h1>Sign in</h1>
          <p className="account-text">
            Don't have account <a href="#" className="create-account">Create Account</a>
          </p>

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

            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-bottom">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password</a>
            </div>

            <button type="submit" className="signin-button">
              Sign In <FaArrowRight />
            </button>
          </form>
        </div>
      </div>

      <div className="checkered-background"></div>
    </div>
  );
}

export default SignIn; 