import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import LowStock from '../Report/LowStock'; // Correct the import path as needed
import './ReportPage.css'
const ReportPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const isTokenExpired = decodedToken.exp * 1000 < Date.now();

            if (isTokenExpired) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [navigate]);

    console.log(localStorage.getItem('userID')); // Check if userID is stored correctly

    return (
        <div>
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="report-container">
                <div className="report-head">
                    <div>
                        <h1>Report Page</h1>
                    </div>
                </div>
                <div className="supplier-stock">
                    <LowStock />
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
