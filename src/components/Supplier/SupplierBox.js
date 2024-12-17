import React, { useEffect, useState } from 'react';
import './SupplierBox.css'; // Optional: Add styles for the SupplierBox component
import SupplierUpdate from './SupplierUpdate'; // Import the SupplierUpdate modal component

const SupplierBox = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null); // State to store the supplier being updated

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User  not authenticated.');
                    setLoading(false);
                    return;
                }

                const userId = localStorage.getItem('userID');
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
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setError('Failed to load suppliers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    const handleUpdate = (updatedSupplier) => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.map((supplier) => (supplier._id === updatedSupplier._id ? updatedSupplier : supplier))
        );
    };

    const handleDelete = async (supplierId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/sup/delete/${supplierId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Failed to delete supplier: ' + errorText);
            }

            // Remove the deleted supplier from the UI
            setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier._id !== supplierId));
            alert("Supplier deleted successfully!");
        } catch (error) {
            console.error('Error deleting supplier:', error);
            alert('Failed to delete supplier: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading suppliers...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <h2>Suppliers</h2>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier._id}>
                        <h3>{supplier.companyName}</h3>
                        <p>Contact: {supplier.contactInfo}</p>
                        <p>Email: {supplier.email}</p>
                        <p>Address: {supplier.address}</p>
                        <button onClick={() => {
                            setCurrentSupplier(supplier);
                            setModalVisible(true);
                        }}>Edit</button>
                        <button onClick={() => handleDelete(supplier._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <SupplierUpdate
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                supplier={currentSupplier}
                onUpdate={handleUpdate}
            />
        </div>
    );
};

export default SupplierBox;