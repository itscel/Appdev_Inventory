import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBarPage.css';

const SidebarPage = () => {
    const [showPage, setShowPage] = useState(false);
    const [activePage, setActivePage] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = (page) => {
        if (page === 'dashboard') {
            navigate('/');
            setShowPage(false); // Close slide page
        } else if (page === 'items') {
            navigate('/items');
            setShowPage(false); // Close slide page
        } else if (page === 'supplier') {
            if (activePage === 'supplier' && showPage) {
                setShowPage(false); // Close slide page if already open
            } else {
                setActivePage('supplier');
                setShowPage(true); // Open slide page
            }
        } else {
            setActivePage(page);
            setShowPage(!showPage); // Toggle for other pages
        }
    };

    const renderContent = () => {
        switch (activePage) {
            case 'items':
                return <button onClick={() => navigate('/supplier')}>All Items</button>;
            case 'supplier':
                return <h1>Supplier Details</h1>; // Example content for supplier
            default:
                return <h1>Options Here</h1>;
        }
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
                    <img
                        src={require('../../Images/dashboard.png')}
                        alt="Dashboard Icon"
                        className="button-image"
                    />
                    <span className="button-text">Dashboard</span>
                </button>
                <button
                    className="sidebar-button"
                    title="Items"
                    onClick={() => handleButtonClick('items')}
                >
                    <img
                        src={require('../../Images/item.png')}
                        alt="Item Icon"
                        className="button-image"
                    />
                    <span className="button-text">Items</span>
                </button>
                <button
                    className="sidebar-button"
                    title="Supplier"
                    onClick={() => handleButtonClick('supplier')}
                >
                    <img
                        src={require('../../Images/supplier.png')}
                        alt="Supplier Icon"
                        className="button-image"
                    />
                    <span className="button-text">Supplier</span>
                </button>
            </div>
            <div className={`slide-page ${showPage ? 'show' : ''}`}>
                {renderContent()}
            </div>
        </div>
    );
};

export default SidebarPage;
