import React, { useState, useEffect } from 'react';
import './ItemAdd.css';

const ItemAdd = ({ isVisible, onClose }) => {
    const [itemName, setItemName] = useState('');
    const [size, setSize] = useState(''); // Single size
    const [quantity, setQuantity] = useState(''); // Single quantity
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [availableSuppliers, setAvailableSuppliers] = useState([]);
    const [userId, setUserId] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

    // Retrieve user ID from localStorage
    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log('Fetched userID:', userID);
        if (userID) {
            setUserId(userID);
        } else {
            console.log('No userID found in localStorage');
        }
    }, []);

    // Fetch suppliers if modal is visible
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/sup/sup');
                if (!response.ok) {
                    throw new Error('Failed to fetch suppliers');
                }
                const data = await response.json();
                console.log('Fetched suppliers:', data);

                if (Array.isArray(data) && data.length > 0) {
                    setAvailableSuppliers(data);
                } else {
                    console.log('No suppliers found or incorrect data structure');
                    setAvailableSuppliers([]);
                }
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setAvailableSuppliers([]);
            }
        };

        if (isVisible) {
            fetchSuppliers();
        }
    }, [isVisible]);

    const handleAddItem = async () => {
        setIsSubmitted(true); // Mark form as submitted

        if (!userId) {
            alert('User is not logged in');
            return;
        }

        if (!itemName.trim()) {
            alert('Please provide an item name.');
            return;
        }

        if (!price.trim() || isNaN(price) || Number(price) <= 0) {
            alert('Please provide a valid price.');
            return;
        }

        if (!category) {
            alert('Please select a category.');
            return;
        }

        if (!subCategory) {
            alert('Please select a sub-category.');
            return;
        }

        if (!supplier) {
            alert('Please select a supplier.');
            return;
        }

        // Ensure quantity is valid (non-negative)
        const validatedSize = size.trim() && quantity.trim() ? { size, quantity: quantity || 0 } : null;

        if (!validatedSize) {
            alert('Please provide both size and quantity.');
            return;
        }

        const newItem = {
            name: itemName,
            price: Number(price),
            sizes: [validatedSize], // Single size and quantity pair
            category,
            subCategory,
            supplierId: supplier,
            userId: localStorage.getItem('userID'),
        };

        const resetForm = () => {
            setItemName('');
            setSize('');
            setQuantity('');
            setPrice('');
            setCategory('');
            setSubCategory('');
            setSupplier('');
        };

        console.log('Submitting item:', JSON.stringify(newItem));

        try {
            const response = await fetch('http://localhost:5001/api/inv/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend error:', errorText);
                throw new Error('Failed to add item: ' + errorText);
            }

            const data = await response.json();
            console.log('Item added successfully:', data);
            alert(`Item "${itemName}" added successfully!`);
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error adding item:', error);
            alert(error.message);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory(''); // Reset sub-category when category changes
    };

    const renderSubCategories = () => {
        // Check the selected category and return corresponding subcategories
        if (category === 'Men') {
            return (
                <>
                    <option value="shirt">Shirt</option>
                    <option value="pants">Pants</option>
                    <option value="shorts">Shorts</option>
                    <option value="shoes">Shoes</option>
                </>
            );
        } else if (category === 'Women') {
            return (
                <>
                    <option value="dress">Dress</option>
                    <option value="shirt">Shirt</option>
                    <option value="shorts">Shorts</option>
                    <option value="skirt">Skirt</option>
                    <option value="pants">Pants</option>
                    <option value="blouse">Blouse</option>
                    <option value="shoes">Shoes</option>
                </>
            );
        } else if (category === 'Kids') {
            return (
                <>
                    <option value="t-shirt">T-Shirt</option>
                    <option value="pants">Pants</option>
                    <option value="shorts">Shorts</option>
                    <option value="shoes">Shoes</option>
                    <option value="sweater">Sweater</option>
                </>
            );
        }
    
        // Default option if no category is selected
        return <option value="" disabled>Select a sub-category</option>;
    };
    

    // Function to apply red border if field is empty and the form is submitted
    const getFieldStyle = (value) => {
        return isSubmitted && !value.trim() ? { borderColor: 'red' } : {};
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-view">
                <h2>ADD ITEM</h2>

                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    style={getFieldStyle(itemName)}
                />

                <label>Price</label>
                <input
                    type="number"
                    placeholder="Enter price for the item"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={getFieldStyle(price)}
                />

                <div className="modal-row">
                    <div className="modal-column size-quantity">
                        <div>
                            <label>Size</label>
                            <select
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                style={getFieldStyle(size)}
                            >
                                <option value="" disabled>Select size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <div>
                            <label>Quantity</label>
                            <input
                                type="number"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                style={getFieldStyle(quantity)}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-row">
                    <div>
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            style={getFieldStyle(category)}
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                    <div>
                        <label>Sub-category</label>
                        <select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            style={getFieldStyle(subCategory)}
                        >
                            <option value="" disabled>Select a sub-category</option>
                            {renderSubCategories()}
                        </select>
                    </div>
                    <div>
                        <label>Supplier</label>
                        <select
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            style={getFieldStyle(supplier)}
                        >
                            <option value="" disabled>Select a supplier</option>
                            {availableSuppliers.length === 0 ? (
                                <option value="" disabled>No suppliers available</option>
                            ) : (
                                availableSuppliers.map((sup) => (
                                    <option key={sup._id} value={sup._id}>
                                        {sup.companyName}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                </div>

  <div className="modal-buttons">
            <button className="btn" onClick={handleAddItem}>
                Add Item
            </button>
            <button className="btn" onClick={onClose}>
                Cancel
            </button>
        </div>
                </div>
        </div>
    );
};

export default ItemAdd;
