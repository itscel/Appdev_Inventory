import React, { useEffect, useState } from 'react';
import './SupplierBox.css'; // Optional: Add styles for the SupplierBox component

const SupplierBox = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                // Get the userId from localStorage
                const userId = localStorage.getItem('userID');

                console.log(userId);

                // Send request to fetch suppliers by userId
                const response = await fetch(`http://localhost:5000/api/sup/supplier?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSuppliers(data.suppliers);
            } catch (err) {
                console.error('Error fetching suppliers:', err);
                setError('Failed to load suppliers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) {
        return <div>Loading suppliers...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="supplier-box">
            {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                    <div key={supplier._id} className="supplier-card">
                        <h3>{supplier.companyName}</h3>
                        <p>Contact: {supplier.contactInfo}</p>
                        <p>Email: {supplier.email}</p>
                        <p>Address: {supplier.address}</p>
                    </div>
                ))
            ) : (
                <div>No suppliers found.</div>
            )}
        </div>
    );
};

export default SupplierBox;
