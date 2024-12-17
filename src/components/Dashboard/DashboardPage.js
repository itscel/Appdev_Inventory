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

    // Fetch stats from API
    const fetchStats = async () => {
        try {
            // Fetch supplier count
            const suppliersResponse = await fetch();
            const suppliersData = await suppliersResponse.json();
    
            // Update stats state
            setStats((prevStats) => ({
                ...prevStats,
                suppliers: suppliersData.count, // Extract 'count' from response
            }));
        } catch (err) {
            console.error("Error fetching supplier stats:", err);
        }
    };
    

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

    // Fetch data only if token is valid
    useEffect(() => {
        if (isTokenValid) {
            fetchStats();
        }
    }, [isTokenValid]);

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
