// SupplierPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import SupplierAdd from './SupplierAdd'; // Import the SupplierAdd component
import './SupplierPage.css';

const SupplierPage = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleAddSupplierClick = () => {
        setIsModalVisible(true); // Show the modal when the button is clicked
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Close the modal
    };

    return (
        <div>
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="supplier-container">
                <div className="supplier-head">
                    <div>
                        <h1>Supplier Page</h1>
                    </div>
                    <div className="supplier-head">
                        <button onClick={handleAddSupplierClick}>Add Supplier</button>
                    </div>
                </div>
            </div>

            <SupplierAdd isVisible={isModalVisible} onClose={handleCloseModal} /> {/* Add the SupplierAdd modal here */}

            <div className="supplier-stock">
                {/* Add supplier items or list if needed */}
            </div>
        </div>
    );
};

export default SupplierPage;
