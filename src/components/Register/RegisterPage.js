import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:5001/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    fullName, 
                    email, 
                    password, 
                    companyName, 
                    address, 
                    contactNumber 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            navigate('/'); 
        } catch (error) {
            console.error('Error during registration:', error);
            setError(error.message);
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
            {error && <p className="error">{error}</p>}
            <div className="form">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                />
                <button 
                    onClick={handleRegister} 
                    disabled={loading || !fullName || !email || !password || !companyName || !address || !contactNumber}
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