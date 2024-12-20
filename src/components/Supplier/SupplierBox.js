import React, { useEffect, useState } from 'react';
import './SupplierBox.css'; 
import SupplierUpdate from './SupplierUpdate'; 

const SupplierBox = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null); 

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                const userId = localStorage.getItem('userID');
                const response = await fetch(`http://localhost:5001/api/sup/supplier?userId=${userId}`, {
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
            const response = await fetch(`http://localhost:5001/api/sup/delete/${supplierId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Failed to delete supplier: ' + errorText);
            }

            
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
            {/* Suppliers Table */}
            <table className="supplier-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier._id}>
                            <td data-label="Company Name">{supplier.companyName}</td>
                            <td data-label="Contact">{supplier.contactInfo}</td>
                            <td data-label="Email">{supplier.email}</td>
                            <td data-label="Address">{supplier.address}</td>
                            <td data-label="Actions">
                                <button
                                    onClick={() => {
                                        setCurrentSupplier(supplier);
                                        setModalVisible(true);
                                    }}
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-pencil-square"></i> 
                                </button>
                                <button
                                    onClick={() => handleDelete(supplier._id)}
                                    className="btn delete-button"
                                >
                                    <i className="bi bi-trash"></i> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
