// SupplierAdd.js
import React, { useState } from 'react';
import './SupplierAdd.css'; // Make sure to style the modal appropriately

const SupplierAdd = ({ isVisible, onClose }) => {
    const [companyName, setCompanyName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [email, setEmail] = useState('');

    const handleAddSupplier = async () => {
        if (!companyName.trim() || !contactInfo.trim() || !email.trim()) {
            alert('Please fill in all fields before adding the supplier.');
            return;
        }

        const newSupplier = {
            companyName,
            contactInfo,
            email,
        };

        try {
            const response = await fetch('http://localhost:5000/api/sup/add', {
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

            // Reset the form and close the modal
            onClose();
            setCompanyName('');
            setContactInfo('');
            setEmail('');
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
                />

                <label>Contact Info</label>
                <input
                    type="text"
                    placeholder="Enter contact information"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
