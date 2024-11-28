import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import './SupplierPage.css';

const SupplierPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="supplier-container">
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="supplier-content">
                <h1>Supplier Page</h1>
                <p>This is the Supplier Page.</p>
            </div>
        </div>
    );
};

export default SupplierPage;
