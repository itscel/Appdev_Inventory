import React, { useState, useEffect } from 'react';
import './SupplierAdd.css'; // Use the same styles as SupplierAdd

const SupplierUpdate = ({ isVisible, onClose, supplier, onUpdate }) => {
    const [companyName, setCompanyName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // Load supplier data when the modal is visible
    useEffect(() => {
        if (supplier) {
            setCompanyName(supplier.companyName);
            setContactInfo(supplier.contactInfo);
            setEmail(supplier.email);
            setAddress(supplier.address);
        }
    }, [supplier]);

    const handleUpdateSupplier = async () => {
        const updatedSupplier = {
            companyName,
            contactInfo,
            email,
            address,
        };

        try {
            const response = await fetch(`http://localhost:5001/api/sup/update/${supplier._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSupplier),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Failed to update supplier: ' + errorText);
            }

            const data = await response.json();
            onUpdate(data.supplier); // Call the update function passed as a prop to refresh the supplier list
            alert("Supplier updated successfully!");
            onClose(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating supplier:', error);
            alert('Failed to update supplier: ' + error.message);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-view">
                <h2>Update Supplier</h2>

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

                <label>Address</label>
                <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="modal-buttons">
                    <button onClick={handleUpdateSupplier}>Update Supplier</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SupplierUpdate;