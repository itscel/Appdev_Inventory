import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);

    // Simulate registration delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to onboarding after registration is successful
      navigate('/onboarding');
    }, 2000);  // Simulating network delay
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '40px',
      backgroundColor: '#F5EBFA',
      fontFamily: "'Inter', sans-serif", // Fixed the issue here
      overflow: 'hidden',
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '15px',
        color: '#49225B',
        fontWeight: '700',
        textAlign: 'center',
      }}>Never Run Out of Stock Again</div>
      
      <div style={{
        fontSize: '18px',
        marginBottom: '35px',
        color: '#6E3482',
        fontWeight: '500',
        textAlign: 'center',
      }}>
        Effortless inventory management for small businesses.
      </div>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <input
          style={{
            width: '100%',
            padding: '12px 15px',
            margin: '12px 0',
            border: '1px solid #A56ABD',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#49225B',
            backgroundColor: '#E7DBEF',
            transition: 'border-color 0.3s ease',
          }}
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          style={{
            width: '100%',
            padding: '12px 15px',
            margin: '12px 0',
            border: '1px solid #A56ABD',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#49225B',
            backgroundColor: '#E7DBEF',
            transition: 'border-color 0.3s ease',
          }}
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={{
            width: '100%',
            padding: '12px 15px',
            margin: '12px 0',
            border: '1px solid #A56ABD',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#49225B',
            backgroundColor: '#E7DBEF',
            transition: 'border-color 0.3s ease',
          }}
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          style={{
            padding: '14px 20px',
            backgroundColor: '#6E3482',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
            marginTop: '20px',
            backgroundColor: loading || !fullname || !email || !password ? '#A56ABD' : '#6E3482',
          }}
          onClick={handleRegister}
          disabled={loading || !fullname || !email || !password}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </div>

      <div style={{
        marginTop: '20px',
        fontSize: '14px',
        color: '#6E3482',
      }}>
        <span>
          Already have an account?{' '}
          <a href="/login" style={{
            textDecoration: 'none',
            color: '#6E3482',
            fontWeight: '600',
          }}>
            Log in
          </a>
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
