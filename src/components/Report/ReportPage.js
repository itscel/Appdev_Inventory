import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import LowStock from './LowStockBySize'; // Ensure correct import path
import StockByCategory from './StocksByCategory'; // Ensure correct import path
import './ReportPage.css';

const ReportPage = () => {
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    // Function to check and validate the token
    const validateToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            const isTokenExpired = decodedToken.exp * 1000 < Date.now();
            if (isTokenExpired) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (err) {
            console.error('Invalid token:', err);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    // Function to simulate loading report data
    const loadReportData = async () => {
        try {
            setLoading(true);
            // Simulate API call with a 2-second delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        } catch (err) {
            setError('Failed to load report data. Please try again.');
            setLoading(false);
        }
    };

    // useEffect to validate token and load data
    useEffect(() => {
        validateToken();
        loadReportData();
    }, [navigate]);

    console.log('User ID:', localStorage.getItem('userID')); // Debug log

    return (
        <div className="report-page">
            {/* Sidebar */}
            <div className="sidebar-container">
                <SidebarPage />
            </div>

            {/* Report Content */}
            <div className="report-container">
                <header className="report-head">
                    <h1>Report Page</h1>
                </header>

                {/* Conditional rendering based on states */}
                {loading ? (
                    <div className="loading-message">
                        <p>Loading report data...</p>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="report-content">
                        {/* Render both charts side by side */}
                        <div className="charts-container">
                            <div className="chart-item">
                                <LowStock />
                            </div>
                            <div className="chart-item">
                                <StockByCategory />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;
