import React, { useEffect, useState } from 'react';
import './LowStock.css';

const LowStockTable = () => {
    const [lowStock, setLowStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userID');

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

                // Group low stock items by name
                const lowStockData = {};

                data.items.forEach((item) => {
                    const lowStockSizes = item.sizes
                        .filter((size) => size.quantity < 10)
                        .map((size) => ({
                            size: size.size,
                            quantity: size.quantity,
                        }));

                    if (lowStockSizes.length > 0) {
                        lowStockData[item.name] = lowStockSizes;
                    }
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

    if (loading) return <div className="loading-message">Loading items...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="lowstock-dashboard-container">
            <h2 className="section-title">Low Stock Items</h2>
            {Object.keys(lowStock).length > 0 ? (
                <div className="lowstock-list">
                    {Object.entries(lowStock).map(([itemName, sizes]) => (
                        <div key={itemName} className="lowstock-item-card">
                            <h3 className="item-name">{itemName}</h3>
                            <ul>
                                {sizes.map((sizeDetail, index) => (
                                    <li key={index} className="size-detail">
                                        Size: <strong>{sizeDetail.size}</strong> - 
                                        Quantity: <strong>{sizeDetail.quantity}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-items-message">No low stock items found</p>
            )}
        </div>
    );
};

export default LowStockTable;
