import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
        // Here you can add your logic to verify the email/password
        login(); // Mark user as authenticated
        navigate('/'); 
      };
  return (
    <div className="login-container">
      <div className="logo">
        {/* <img src="logo.png" alt="Logo" /> */}
      </div>
      <div className="main-heading">Welcome Back!</div>
      <div className="sub-heading">Login to your account</div>

      <div className="form">
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="submit-button"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? 'Logging in...' : 'Continue'}
        </button>
      </div>

      <div className="register-link">
        <span>
          New here?{' '}
          <a href="/register">Create an account</a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
