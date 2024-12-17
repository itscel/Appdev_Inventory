import React, { useEffect, useState } from 'react';

const Report = () => {
    const [items, setItems] = useState([]);
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
                console.log('Fetched Items:', data.items);
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
        <div className="report-container">
            <h2>Item Report</h2>
            {items.length > 0 ? (
                <div className="report-list">
                    {items.map((item) => (


                        <div key={item._id} className="report-item">
                            <h3>{item.name}</h3>
                            <p><strong>Price:</strong> ${item.price}</p>
                            <p><strong>Sizes:</strong></p>
                            <ul>
                                {item.sizes.map((size) => (
                                    <li key={size._id}>
                                        <strong>{size.size}:</strong> {size.quantity} pcs.
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Category:</strong> {item.category}</p>
                            <p><strong>Subcategory:</strong> {item.subCategory}</p>
                        </div>

                        
                    ))}
                </div>
            ) : (
                <div>No items found.</div>
            )}
        </div>
    );
};

export default Report;
