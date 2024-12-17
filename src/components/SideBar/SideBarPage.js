import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './SideBarPage.css';

const SidebarPage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (page) => {
        if (page === 'dashboard') {
            navigate('/');
        } else if (page === 'items') {
            navigate('/items');
        } else if (page === 'supplier') {
            navigate('/supplier');
        } else if (page === 'report') {
            navigate('/report');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="side-container">
            <div className="sidebar">
                <img
                    src={require('../../Images/Logo_Transparent.png')}
                    alt="Logo"
                    className="sidebar-logo"
                />
                <button
                    className="sidebar-button"
                    title="Dashboard"
                    onClick={() => handleButtonClick('dashboard')}
                >
                    <i className="bi bi-house-door" /> {/* Dashboard Icon */}
                    <div className="tooltip">Dashboard</div>
                </button>
                <button
                    className="sidebar-button"
                    title="Items"
                    onClick={() => handleButtonClick('items')}
                >
                    <i className="bi bi-box" /> {/* Item Icon */}
                    <div className="tooltip">Items</div>
                </button>
                <button
                    className="sidebar-button"
                    title="Supplier"
                    onClick={() => handleButtonClick('supplier')}
                >
                    <i className="bi bi-person" /> {/* Supplier Icon */}
                    <div className="tooltip">Supplier</div>
                </button>
                <button
                    className="sidebar-button"
                    onClick={() => handleButtonClick('report')}
                >
                    <i className="bi bi-file-earmark-bar-graph" /> {/* Report Icon */}
                    <div className="tooltip">Report</div>
                </button>
                <button className="sidebar-button" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" /> {/* Logout Icon */}
                    <div className="tooltip">Logout</div>
                </button>
            </div>
        </div>
    );
};

export default SidebarPage;
