import React, { useState, useEffect } from 'react';
import './ItemAdd.css'; // Use the same styles as ItemAdd

const ItemUpdate = ({ isVisible, onClose, item, onUpdate }) => {
    const [itemName, setItemName] = useState('');
    const [itemDetails, setItemDetails] = useState({
        XS: { quantity: '' },
        S: { quantity: '' },
        M: { quantity: '' },
        L: { quantity: '' },
        XL: { quantity: '' },
    });
    const [price, setPrice] = useState('');

    // Load item data when the modal is visible
    useEffect(() => {
        if (item) {
            setItemName(item.name);
            setPrice(item.price);
            const sizes = item.sizes.reduce((acc, size) => {
                acc[size.size] = { quantity: size.quantity || 0 };
                return acc;
            }, {});
            setItemDetails(sizes);
        }
    }, [item]);

    const handleUpdateItem = async () => {
        const validatedSizes = Object.keys(itemDetails).reduce((acc, size) => {
            acc[size] = {
                quantity: itemDetails[size].quantity || 0,
            };
            return acc;
        }, {});

        const updatedItem = {
            name: itemName,
            price: Number(price),
            sizes: Object.keys(validatedSizes).map((size) => ({
                size,
                quantity: validatedSizes[size].quantity,
            })),
        };

        try {
            const response = await fetch(`http://localhost:5001/api/inv/update/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Failed to update item: ' + errorText);
            }

            const data = await response.json();
            onUpdate(data.item); // Call the update function passed as a prop to refresh the item list
            alert("Item updated successfully!");
            onClose(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Failed to update item: ' + error.message);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-view">
                <h2>Update Item</h2>

                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />

                <label>Price</label>
                <input
                    type="number"
                    placeholder="Enter price for all sizes"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <div className="modal-row">
                    {Object.keys(itemDetails).map((size) => (
                        <div key={size}>
                            <label>{size}</label>
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={itemDetails[size].quantity}
                                onChange={(e) => setItemDetails({
                                    ...itemDetails,
                                    [size]: { quantity: e.target.value }
                                })}
                            />
                        </div>
                    ))}
                </div>

                <div className="modal-buttons">
                    <button onClick={handleUpdateItem}>Update Item</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ItemUpdate;