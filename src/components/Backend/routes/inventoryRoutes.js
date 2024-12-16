const express = require("express");
const mongoose = require('mongoose');
const User = require("../models/User");
const Supplier = require("../models/Supplier");
const Item = require("../models/Item"); // Assuming the Supplier model exists
const router = express.Router();

// Add new item route
router.post('/add', async (req, res) => {
  try {
    console.log('Raw Request Body:', req.body); // Log raw body for debugging
    const { name, price, sizes, category, subCategory, supplierId, userId } = req.body;

    // Proceed with the existing logic
    if (!name || !price || !sizes || !category || !subCategory || !supplierId || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findById(userId);
    if (!userId) {
      return res.status(400).json({ error: 'user not found' });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(400).json({ error: 'Supplier not found' });
    }

    const newItem = new Item({
      name,
      price,
      sizes,
      category,
      subCategory,
      supplier: supplierId,
      user: userId, // Ensure userId is passed in the item
    });

    await newItem.save();

    // Destructure the necessary fields, including timestamps
    const { createdAt, updatedAt } = newItem; // Access createdAt and updatedAt fields

    console.log('Destructured Data:', { name, price, sizes, category, subCategory, supplierId, userId, createdAt, updatedAt });

    res.status(201).json({
      message: 'Item added successfully',
      item: newItem,
    });
  } catch (error) {
    console.error('Error in adding item:', error);
    res.status(500).json({ error: 'Failed to add item', details: error.message });
  }
});

// Get all items route (all items, no userId filter)
router.get('/items/all', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from MongoDB
    res.json(items); // Send items as response
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});
// Get items by userId route
router.get('/items', async (req, res) => {
  const userId = req.query.userId;  // Extract userId from query parameters
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Convert userId to ObjectId if it's a string
    const userObjectId = mongoose.Types.ObjectId(userId);

    // Fetch items for the specified userId from the database
    const items = await Item.find({ user: userObjectId });

    // Return the items in the response
    res.json({ message: 'Items retrieved successfully', items });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
});

module.exports = router;
