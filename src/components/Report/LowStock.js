import React, { useEffect, useState } from 'react';
import './LowStock.css';

const LowStock = () => {
    const [items, setItems] = useState([]);
    const [lowStock, setLowStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userID');

                console.log('Token:', token);
                console.log('User ID:', userId);

                if (!token || !userId) {
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5001/api/inv/items?userId=${userId}`, {
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

                // Calculate low stock
                const lowStockData = {
                    XS: [],
                    S: [],
                    M: [],
                    L: [],
                    XL: [],
                };

                data.items.forEach((item) => {
                    item.sizes.forEach((size) => {
                        if (size.quantity < 10) {
                            lowStockData[size.size]?.push({
                                name: item.name,
                                quantity: size.quantity,
                            });
                        }
                    });
                });

                // Sort low-stock items by quantity (ascending)
                Object.keys(lowStockData).forEach((size) => {
                    lowStockData[size].sort((a, b) => a.quantity - b.quantity);
                });

                setLowStock(lowStockData);
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
        <div className="lowstock-box">
            {Object.entries(lowStock).map(([size, items]) => (
                <div key={size} className="lowstock-card">
                    <h3>Low Stock: {size}</h3>
                    {items.length > 0 ? (
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.name}</strong> → {item.quantity} pcs.
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items with low stock in this size.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LowStock;
