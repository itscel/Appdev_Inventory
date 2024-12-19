import React, { useState, useEffect } from 'react';
import './SupplierAdd.css'; 

const SupplierAdd = ({ isVisible, onClose }) => {
    const [companyName, setCompanyName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(''); 
    const [userId, setUserId] = useState([]);
    const [tooltip, setTooltip] = useState({}); 
    const [errorFields, setErrorFields] = useState({}); 

    
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log('Fetched userID:', userID); 
        if (userID) {
            setUserId(userID);
        } else {
            console.log('No userID found in localStorage');
        }
    }, []);

    const handleAddSupplier = async () => {
        let isValid = true;

        
        setTooltip({});
        setErrorFields({});

        if (!companyName.trim() || !contactInfo.trim() || !email.trim() || !address.trim()) {
            setTooltip((prev) => ({ ...prev, general: 'Please fill in all fields before adding the supplier.' }));
            isValid = false;
            setErrorFields((prev) => ({ ...prev, companyName: true, contactInfo: true, email: true, address: true }));
        }

        
        const contactInfoPattern = /^[0-9]{11}$/;
        if (!contactInfoPattern.test(contactInfo)) {
            setTooltip((prev) => ({ ...prev, contactInfo: 'Contact information must be exactly 11 digits.' }));
            isValid = false;
            setErrorFields((prev) => ({ ...prev, contactInfo: true }));
        }

        
        if (!email.endsWith('@gmail.com')) {
            setTooltip((prev) => ({ ...prev, email: 'Email must be a Gmail address.' }));
            isValid = false;
            setErrorFields((prev) => ({ ...prev, email: true }));
        }

        if (!isValid) return;

        const newSupplier = {
            companyName,
            contactInfo,
            email,
            address, 
            userId,
        };

        try {
            const response = await fetch('http://localhost:5001/api/sup/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSupplier),
            });

            if (!response.ok) {
                throw new Error('Failed to add supplier');
            }

            const data = await response.json();
            console.log('Supplier added:', data);
            alert(`Supplier "${companyName}" added successfully!`);

            
            onClose();
            setCompanyName('');
            setContactInfo('');
            setEmail('');
            setAddress(''); 
            setTooltip({}); 
            setErrorFields({}); 
        } catch (error) {
            console.error('Error adding supplier:', error);
            alert('Failed to add supplier');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-view">
                <h2>ADD SUPPLIER</h2>

                <label>Company Name</label>
                <input
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={errorFields.companyName ? 'error' : ''}
                />
                {tooltip.general && <div className="tooltip">{tooltip.general}</div>}

                <label>Contact Info</label>
                <input
                    type="text"
                    placeholder="Enter contact information"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    maxLength="11" 
                    className={errorFields.contactInfo ? 'error' : ''}
                />
                {tooltip.contactInfo && <div className="tooltip">{tooltip.contactInfo}</div>}

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errorFields.email ? 'error' : ''}
                />
                {tooltip.email && <div className="tooltip">{tooltip.email}</div>}

                <label>Address</label>
                <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={errorFields.address ? 'error' : ''}
                />

                <button className="add-button" onClick={handleAddSupplier}>
                    Add Supplier
                </button>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default SupplierAdd;
