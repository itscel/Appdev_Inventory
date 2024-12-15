import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessProfilePage = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [trackingItem, setTrackingItem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Set background color for the whole page when this component is loaded
    document.body.style.backgroundColor = 'rgb(245, 235, 250)';
    
    // Cleanup function to reset background when leaving the page
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  const handleSubmit = () => {
    if (companyName && companyIndustry && trackingItem) {
      // Navigate to the dashboard after successful submission
      navigate('/dashboard');
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '40px 20px',
      width: '100%',
      maxWidth: '500px',
      margin: 'auto',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      <h1 style={{
        fontSize: '48px',
        textAlign: 'center',
        marginBottom: '25px',
        color: '#49225B',
        fontWeight: '700',
      }}>
        A bit about your business.
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#6E3482',
        textAlign: 'center',
        marginBottom: '45px',
        fontWeight: '500',
      }}>
        Help us personalize your experience by sharing a few details about your needs.
      </p>

      <form style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input
          style={{
            marginBottom: '20px',
            padding: '14px 18px',
            border: '1px solid #A56ABD',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#49225B',
            backgroundColor: '#E7DBEF',
            transition: 'border-color 0.3s ease',
          }}
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <select
          style={{
            marginBottom: '20px',
            padding: '14px 18px',
            border: '1px solid #A56ABD',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#49225B',
            backgroundColor: '#E7DBEF',
            transition: 'border-color 0.3s ease',
          }}
          value={companyIndustry}
          onChange={(e) => setCompanyIndustry(e.target.value)}
          required
        >
          <option value="">Select Industry</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="logistics">Logistics</option>
        </select>

        <div style={{
          fontSize: '12px',
          color: '#6E3482',
          fontWeight: '500',
          letterSpacing: '0.5px',
          width: '100%',
        }}>
          I’m primarily looking to track:
        </div>

        <select
          style={{
            marginBottom: '20px',
            padding: '14px 18px',
            border: '1px solid #A56ABD',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#49225B',
            backgroundColor: '#E7DBEF',
            transition: 'border-color 0.3s ease',
          }}
          value={trackingItem}
          onChange={(e) => setTrackingItem(e.target.value)}
          required
        >
          <option value="">What do you want to track?</option>
          <option value="inventory">Inventory</option>
          <option value="assets">Assets</option>
          <option value="equipment">Equipment</option>
        </select>

        <button
          style={{
            backgroundColor: '#6E3482',
            color: 'white',
            padding: '16px 22px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
            marginTop: '20px',
          }}
          type="submit"
        >
          Get Started
        </button>
      </form>
    </section>
  );
};

export default BusinessProfilePage;
