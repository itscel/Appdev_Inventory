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
        totalItems: 0, // This will store the count of items
        suppliers: 0, // This will store the count of suppliers
        recentActivities: [],
        lowStockDetails: [],
    });
    const [userId, setUserId] = useState('');

    // Retrieve user ID from localStorage
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log('Fetched userID:', userID);
        if (userID) {
            setUserId(userID);
        } else {
            console.log('No userID found in localStorage');
        }
    }, []);

    // Fetch supplier and item stats from API
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch suppliers
                const supplierResponse = await fetch(`http://localhost:5001/api/sup/supplier?userId=${userId}`);
                if (!supplierResponse.ok) {
                    throw new Error('Failed to fetch suppliers');
                }
                const supplierData = await supplierResponse.json();
                console.log('Fetched suppliers:', supplierData);

                // Update the suppliers count
                const supplierCount = supplierData.suppliers && Array.isArray(supplierData.suppliers) ? supplierData.suppliers.length : 0;

                // Fetch items (assuming an endpoint for items exists)
                const itemResponse = await fetch(`http://localhost:5001/api/inv/items?userId=${userId}`);
                if (!itemResponse.ok) {
                    throw new Error('Failed to fetch items');
                }
                const itemData = await itemResponse.json();
                console.log('Fetched items:', itemData);

                // Update the items count
                const itemCount = itemData.items && Array.isArray(itemData.items) ? itemData.items.length : 0;

                // Update stats state
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

    // Token validation logic
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
                    {/* Stat Card for Total Items */}
                    <div className="stat-card">
                        <i className="bi bi-box"></i>
                        <h3>Total Items</h3>
                        <p>{stats.totalItems}</p>
                    </div>
                    {/* Stat Card for Suppliers */}
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
