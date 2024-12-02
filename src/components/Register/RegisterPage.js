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

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName: fullname, email, password }), // Send fullName, email, and password
      });

      if (response.ok) {
        // Navigate to onboarding if successful
        navigate("/onboarding");
      } else {
        const data = await response.json();
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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