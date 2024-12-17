import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusinessProfilePage.css';

const BusinessProfilePage = () => {
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (companyName && address && contactNumber) {
            // Here you would typically send the data to your backend
            console.log('Business Profile Data:', { companyName, address, contactNumber });
            // Navigate to the dashboard or another page after successful submission
            navigate('/');
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="business-profile-container">
            <div className="main-heading">A bit about your business.</div>
            <div className="sub-heading">
                Help us personalize your experience by sharing a few details about your needs.
            </div>

            <div className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                />
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default BusinessProfilePage;