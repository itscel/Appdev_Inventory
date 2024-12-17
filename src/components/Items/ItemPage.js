import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import ItemAdd from './ItemAdd';  // Import the ItemAdd component
import ItemBox from './ItemBox'; // Import the ItemBox component
import './ItemPage.css'; // Import the CSS for styling

const ItemPage = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    // Effect hook to check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
        }
    }, [navigate]);

    // Function to handle Add Item button click and show the modal
    const handleAddItemClick = () => {
        setIsModalVisible(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            {/* Sidebar section */}
            <div className="sidebar-container">
                <SidebarPage />
            </div>

            {/* Item container */}
            <div className="item-container">
                <div className="item-head">
                    <h1>Items Page</h1>
                    <button onClick={handleAddItemClick}>Add Item</button>
                </div>
                
                {/* Item Box section */}
                <div className="item-stock">
                    <ItemBox />
                </div>
            </div>

            {/* ItemAdd Modal */}
            <ItemAdd isVisible={isModalVisible} onClose={handleCloseModal} />
        </div>
    );
};

export default ItemPage;
