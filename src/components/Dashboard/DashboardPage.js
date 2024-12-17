import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import './DashboardPage.css';
import ReportPage from '../Report/LowStock'; // Correct the import path as needed

const DashboardPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            // You can also check token expiration here, if needed
            // For example, if token has an expiration time, check if it's expired
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT
            const isTokenExpired = decodedToken.exp * 1000 < Date.now(); // Expiry is in seconds

            if (isTokenExpired) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [navigate]);

    console.log(localStorage.getItem('userID')); // Check if userID is stored correctly

    return (
        <div className="dashboard-container">
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="dashboard-content">
                <h1>Dashboard Page</h1>
                <p>This is where you can manage or view your items.</p>
            </div>
            <div>
                <ReportPage />
            </div>
        </div>
    );
};

export default DashboardPage;
