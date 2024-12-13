import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPage from '../SideBar/SideBarPage';
import './ItemPage.css';
import ItemAdd from './ItemAdd';  // ItemAdd import
import ItemFolder from './ItemFolder';  // Import ItemFolder
import ItemBox from './ItemBox';

const ItemPage = () => {
    const navigate = useNavigate();
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isFolderPopUpVisible, setIsFolderPopUpVisible] = useState(false); // State for folder pop-up

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <div className="sidebar-container">
                <SidebarPage />
            </div>
            <div className="item-container">
                <div className="item-head">
                    <div>
                        <h1>Items Page</h1>
                    </div>
                    <div className="item-head">
                        <button onClick={() => setIsPopUpVisible(true)}>Add Item</button>
                        <button onClick={() => setIsFolderPopUpVisible(true)}>Add Folder</button> {/* Set folder popup visibility */}
                    </div>
                </div>
                <div className="item-stock">
                    <ItemBox />
                </div>
                {/* Pass the state for visibility and onClose handler for both ItemAdd and ItemFolder */}
                <ItemAdd isVisible={isPopUpVisible} onClose={() => setIsPopUpVisible(false)} />
                <ItemFolder isVisible={isFolderPopUpVisible} onClose={() => setIsFolderPopUpVisible(false)} /> {/* Add ItemFolder */}
            </div>
        </div>
    );
};

export default ItemPage;
