import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
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
                    <i className="bi bi-house-door" /> {}
                </button>
                <button
                    className="sidebar-button"
                    title="Items"
                    onClick={() => handleButtonClick('items')}
                >
                    <i className="bi bi-box" /> {}
                </button>
                <button
                    className="sidebar-button"
                    title="Supplier"
                    onClick={() => handleButtonClick('supplier')}
                >
                    <i className="bi bi-person" /> {}
                </button>
                <button
                    className="sidebar-button"
                    onClick={() => handleButtonClick('report')}
                >
                    <i className="bi bi-file-earmark-bar-graph" /> {}
                </button>
                <button className="sidebar-button" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" /> {}
                </button>
            </div>
            {}
        </div>
    );
};

export default SidebarPage;
