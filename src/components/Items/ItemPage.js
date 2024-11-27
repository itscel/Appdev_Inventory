import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import './ItemPage.css';

const ItemPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="item-container">
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="item-content">
                <h1>Items Page</h1>
                <p>This is where you can manage or view your items.</p>
            </div>
        </div>
    );
};

export default ItemPage;
