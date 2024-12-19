// SupplierPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import SupplierAdd from './SupplierAdd'; 
import SupplierBox from './SupplierBox';
import './SupplierPage.css';

const SupplierPage = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleAddSupplierClick = () => {
        setIsModalVisible(true); 
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="supplier-container">
                <div className="supplier-head">
                    <h1>Supplier Page</h1>
                    <button onClick={handleAddSupplierClick}>Add Supplier</button>
                </div>
                <div className="supplier-stock">
                    <SupplierBox />
                </div>
            </div>

            <SupplierAdd isVisible={isModalVisible} onClose={handleCloseModal} /> {}
        </div>
    );
};

export default SupplierPage;
