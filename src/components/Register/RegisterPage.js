import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    
    // You can add your registration API call here

    // Simulate registration delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to onboarding after registration is successful
      navigate('/onboarding');
    }, 2000);  // Simulating network delay
  };

  return (
    <div className="register-container">
      <div className="main-heading">Never Run Out of Stock Again</div>
      <div className="sub-heading">
        Effortless inventory management for small businesses.
      </div>

      <div className="form">
        <input
          className="input"
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="submit-button"
          onClick={handleRegister}
          disabled={loading || !fullname || !email || !password}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </div>

      <div className="login-link">
        <span>
          Already have an account?{' '}
          <a href="/login">Log in</a>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
