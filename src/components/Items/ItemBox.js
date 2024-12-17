import React, { useEffect, useState } from 'react';
import './ItemBox.css'; // Optional: Add styles for the ItemBox component
import ItemUpdate from './ItemUpdate'; // Import the ItemUpdate modal component

const ItemBox = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); // State to store the item being updated

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User  not authenticated.');
                    setLoading(false);
                    return;
                }

                const userId = localStorage.getItem('userID');

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

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/inv/delete/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            // Remove the deleted item from the UI
            setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item');
        }
    };

    // Open the update modal
    const openUpdateModal = (item) => {
        setCurrentItem(item);
        setModalVisible(true);
    };

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
                        <button onClick={() => openUpdateModal(item)}>Update</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <div>No items found.</div>
            )}

            <ItemUpdate
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                item={currentItem}
                onUpdate={(updatedItem) => {
                    setItems((prevItems) =>
                        prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i))
                    );
                    setModalVisible(false);
                }}
            />
        </div>
    );
};

export default ItemBox;