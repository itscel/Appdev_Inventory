import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import ItemAdd from './ItemAdd';  // Import the ItemAdd component
import ItemBox from './ItemBox';
import './ItemPage.css';

const ItemPage = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleAddItemClick = () => {
        setIsModalVisible(true); // Show the modal when the button is clicked
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Close the modal
    };

    return (
        <div>
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="item-container">
                <div className="item-head">
                    <h1>Items Page</h1>
                    <button onClick={handleAddItemClick}>Add Item</button>
                </div>
                <div className="item-stock">
                    <ItemBox />
                </div>
            </div>

            <ItemAdd isVisible={isModalVisible} onClose={handleCloseModal} /> {/* Add the ItemAdd modal here */}
        </div>
    );
};

export default ItemPage;
