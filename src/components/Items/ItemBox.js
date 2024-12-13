import React, { useEffect, useState } from 'react';
import './ItemBox.css';

const ItemBox = () => {
    const [items, setItems] = useState([]);
    const userId = localStorage.getItem('userID'); // Ensure userID is stored in localStorage


    useEffect(() => {
        const fetchItems = async () => {
            if (!userId) {
                console.error('No userId found in localStorage');
                return;
            } else {
                console.log(userId);
            }

            try {
                const response = await fetch(`http://localhost:5000/api/inv/items?user=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // JWT if used
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }

                const data = await response.json();

                // Ensure only items with the correct userId are displayed (additional check if necessary)
                const filteredItems = data.items.filter((item) => item.user === userId);
                setItems(filteredItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [userId]);

    return (
        <div className="item-box-container">
            {items.length > 0 ? (
                items.map((item) => (
                    <div className="item-box" key={item._id}>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))
            ) : (
                <p>No items found for this user.</p>
            )}
        </div>
    );
};

export default ItemBox;
