import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import RecentActivities from '../Report/RecentActivitie';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [stats, setStats] = useState({
        totalItems: 200,
        lowStockItems: 15,
        suppliers: 10,
        recentActivities: [],
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            if (expiryTime < currentTime) {
                localStorage.removeItem('token');
                setIsTokenValid(false);
                navigate('/login');
            }
        }
    }, [navigate]);

    if (!isTokenValid) {
        return null; // Optionally show loading or error page
    }

    return (
        <div className="dashboard-container">
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <i className="bi bi-box"></i>
                        <h3>Total Items</h3>
                        <p>{stats.totalItems}</p>
                    </div>
                    <div className="stat-card">
                        <i className="bi bi-box-arrow-down"></i>
                        <h3>Low Stock Items</h3>
                        <p>{stats.lowStockItems}</p>
                    </div>
                    <div className="stat-card">
                        <i className="bi bi-person"></i>
                        <h3>Suppliers</h3>
                        <p>{stats.suppliers}</p>
                    </div>
                </div>
                <RecentActivities activities={stats.recentActivities} />
            </div>
        </div>
    );
};

export default DashboardPage;
