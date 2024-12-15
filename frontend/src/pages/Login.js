import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login (no backend involved)
    if (email === 'test@example.com' && password === 'password') {
      console.log('Login successful');
      navigate('/dashboard');
    } else {
      console.error('Login error');
      alert('Invalid credentials.');
    }
    setLoading(false);
  };

  const styles = {
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '40px',
      backgroundColor: '#F5EBFA',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    },
    mainHeading: {
      fontSize: '48px',
      marginBottom: '15px',
      color: '#49225B',
      fontWeight: '700',
      textAlign: 'center',
    },
    subHeading: {
      fontSize: '18px',
      marginBottom: '35px',
      color: '#6E3482',
      fontWeight: '500',
      textAlign: 'center',
    },
    form: {
      width: '100%',
      maxWidth: '420px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      margin: '12px 0',
      border: '1px solid #A56ABD',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#49225B',
      backgroundColor: '#E7DBEF',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#6E3482',
      outline: 'none',
    },
    submitButton: {
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
    },
    submitButtonDisabled: {
      backgroundColor: '#A56ABD',
    },
    submitButtonHover: {
      backgroundColor: '#49225B',
    },
    registerLink: {
      marginTop: '20px',
      fontSize: '14px',
      color: '#6E3482',
    },
    registerLinkAnchor: {
      textDecoration: 'none',
      color: '#6E3482',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div className="logo">
        {/* <img src="logo.png" alt="Logo" /> */}
      </div>
      <div style={styles.mainHeading}>Welcome Back!</div>
      <div style={styles.subHeading}>Login to your account</div>

      <form style={styles.form} onSubmit={handleLogin}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          style={{
            ...styles.submitButton,
            ...(loading || !email || !password ? styles.submitButtonDisabled : {}),
          }}
          type="submit"
          disabled={loading || !email || !password}
        >
          {loading ? 'Logging in...' : 'Continue'}
        </button>
      </form>

      <div style={styles.registerLink}>
        <span>
          New here?{' '}
          <a href="/register" style={styles.registerLinkAnchor}>
            Create an account
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
