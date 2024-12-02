import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        login();

        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        {/* <img src="logo.png" alt="Logo" /> */}
      </div>
      <div className="main-heading">Welcome Back!</div>
      <div className="sub-heading">Login to your account</div>

      {error && <div className="error-message">{error}</div>}

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

