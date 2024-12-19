import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import LowStock from './LowStockBySize'; 
import StockByCategory from './StocksByCategory'; 
import './ReportPage.css';

const ReportPage = () => {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    
    const validateToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); 
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

    
    const loadReportData = async () => {
        try {
            setLoading(true);
            
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
        } catch (err) {
            setError('Failed to load report data. Please try again.');
            setLoading(false);
        }
    };

    
    useEffect(() => {
        validateToken();
        loadReportData();
    }, [navigate]);

    console.log('User ID:', localStorage.getItem('userID')); 

    return (
        <div className="report-page">
            {}
            <div className="sidebar-container">
                <SidebarPage />
            </div>

            {}
            <div className="report-container">
                <header className="report-head">
                    <h1>Report Page</h1>
                </header>

                {}
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
                        {}
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
