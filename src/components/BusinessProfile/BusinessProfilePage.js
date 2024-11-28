import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './BusinessProfilePage.css';

const BusinessProfilePage = ({ login }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [trackingItem, setTrackingItem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (companyName && companyIndustry && trackingItem) {
      login(); 
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
        <select
          className="input"
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
          required
        >
          <option value="">Select Industry</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="logistics">Logistics</option>
        </select>

        <div className="tracking-text">
          I’m primarily looking to track:
        </div>

        <select
          className="input"
          value={trackingItem}
          onChange={(e) => setTrackingItem(e.target.value)}
          required
        >
          <option value="">What do you want to track?</option>
          <option value="inventory">Inventory</option>
          <option value="assets">Assets</option>
          <option value="equipment">Equipment</option>
        </select>

        <button className="submit-button" onClick={handleSubmit}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default BusinessProfilePage;
