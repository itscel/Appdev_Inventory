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
                </button>
                <button
                    className="sidebar-button"
                    title="Items"
                    onClick={() => handleButtonClick('items')}
                >
                    <i className="bi bi-box" /> {/* Item Icon */}
                </button>
                <button
                    className="sidebar-button"
                    title="Supplier"
                    onClick={() => handleButtonClick('supplier')}
                >
                    <i className="bi bi-person" /> {/* Supplier Icon */}
                </button>
                <button
                    className="sidebar-button"
                    onClick={() => handleButtonClick('report')}
                >
                    <i className="bi bi-file-earmark-bar-graph" /> {/* Report Icon */}
                </button>
                <button className="sidebar-button" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" /> {/* Logout Icon */}
                </button>
            </div>
            {/* No need for slide-page or renderContent anymore */}
        </div>
    );
};

export default SidebarPage;
