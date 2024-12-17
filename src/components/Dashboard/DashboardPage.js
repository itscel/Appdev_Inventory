import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import RecentActivities from '../Report/RecentActivities';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [stats, setStats] = useState({
        totalItems: 0,
        lowStockItems: 0,
        suppliers: 0,
        recentActivities: [],
    });

    // Fetch stats from API
    const fetchStats = async () => {
        try {
            const response = await fetch('your-api-endpoint'); // Replace with actual API
            const data = await response.json();
            setStats({
                totalItems: data.totalItems,
                lowStockItems: data.lowStockItems,
                suppliers: data.suppliers,
                recentActivities: data.recentActivities,
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

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

    useEffect(() => {
        // Fetch stats when component mounts and token is valid
        if (isTokenValid) {
            fetchStats();
        }
    }, [isTokenValid]);

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
