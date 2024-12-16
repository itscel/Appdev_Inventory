import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    console.log(localStorage.getItem('userID')); // Corrected key for userID

    return (
        <div className="dashboard-container">
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="dashboard-content">
                <h1>Dashboard Page</h1>
                <p>This is where you can manage or view your items.</p>
            </div>
        </div>
    );
};

export default DashboardPage;
