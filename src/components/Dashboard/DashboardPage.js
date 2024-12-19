import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarPage from "../SideBar/SideBarPage";
import LowStock from "../Report/LowStock";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "./DashboardPage.css";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [stats, setStats] = useState({
        totalItems: 0, 
        suppliers: 0, 
        recentActivities: [],
        lowStockDetails: [],
    });
    const [userId, setUserId] = useState('');

    
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log('Fetched userID:', userID);
        if (userID) {
            setUserId(userID);
        } else {
            console.log('No userID found in localStorage');
        }
    }, []);

    
    useEffect(() => {
        const fetchStats = async () => {
            try {
                
                const supplierResponse = await fetch(`http://localhost:5001/api/sup/supplier?userId=${userId}`);
                if (!supplierResponse.ok) {
                    throw new Error('Failed to fetch suppliers');
                }
                const supplierData = await supplierResponse.json();
                console.log('Fetched suppliers:', supplierData);

                
                const supplierCount = supplierData.suppliers && Array.isArray(supplierData.suppliers) ? supplierData.suppliers.length : 0;

                
                const itemResponse = await fetch(`http://localhost:5001/api/inv/items?userId=${userId}`);
                if (!itemResponse.ok) {
                    throw new Error('Failed to fetch items');
                }
                const itemData = await itemResponse.json();
                console.log('Fetched items:', itemData);

                
                const itemCount = itemData.items && Array.isArray(itemData.items) ? itemData.items.length : 0;

                
                setStats((prevStats) => ({
                    ...prevStats,
                    suppliers: supplierCount,
                    totalItems: itemCount,
                }));
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats((prevStats) => ({
                    ...prevStats,
                    suppliers: 0,
                    totalItems: 0,
                }));
            }
        };

        if (userId) {
            fetchStats();
        }
    }, [userId]);

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const expiryTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            if (expiryTime < currentTime) {
                localStorage.removeItem("token");
                setIsTokenValid(false);
                navigate("/login");
            }
        }
    }, [navigate]);

    if (!isTokenValid) {
        return null;
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
                    {}
                    <div className="stat-card">
                        <i className="bi bi-box"></i>
                        <h3>Total Items</h3>
                        <p>{stats.totalItems}</p>
                    </div>
                    {}
                    <div className="stat-card">
                        <i className="bi bi-person"></i>
                        <h3>Suppliers</h3>
                        <p>{stats.suppliers}</p>
                    </div>
                </div>
                <div className="low-stock-container">
                    <LowStock lowStockDetails={stats.lowStockDetails} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
