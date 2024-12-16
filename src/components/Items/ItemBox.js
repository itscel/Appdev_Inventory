import React, { useEffect, useState } from 'react';
import './ItemBox.css'; // Optional: Add styles for the ItemBox component

const ItemBox = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                // Decode the token to extract the userId (if applicable)
                const userId = localStorage.getItem('userID');

                console.log(userId);

                const response = await fetch(`http://localhost:5000/api/inv/items?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setItems(data.items);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to load items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div>Loading items...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="item-box">
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item._id} className="item-card">
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                    </div>
                ))
            ) : (
                <div>No items found.</div>
            )}
        </div>
    );
};

export default ItemBox;
