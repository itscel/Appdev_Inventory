import React, { useEffect, useState } from 'react';
import './ItemBox.css'; // Import the styling
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
                    setError('User not authenticated.');
                    setLoading(false);
                    return;
                }

                const userId = localStorage.getItem('userID');
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
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Failed to load items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleUpdate = (updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
    };

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/api/inv/delete/${itemId}`, {
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

    if (loading) {
        return <div>Loading items...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <h2>Items</h2>
            {/* Items Table */}
            <table className="item-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td data-label="Item Name">{item.name}</td>
                            <td data-label="Price">${item.price}</td>
                            <td data-label="Actions">
                                <button
                                    onClick={() => {
                                        setCurrentItem(item);
                                        setModalVisible(true);
                                    }}
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-danger delete-button"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update modal */}
            <ItemUpdate
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                item={currentItem}
                onUpdate={handleUpdate}
            />
        </div>
    );
};

export default ItemBox;
