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

    console.log('Destructured Data:', { name, price, sizes, category, subCategory, supplierId, userId });

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

    res.status(201).json({
      message: 'Item added successfully',
      item: newItem,
    });
  } catch (error) {
    console.error('Error in adding item:', error);
    res.status(500).json({ error: 'Failed to add item', details: error.message });
  }
});

// Get all items route
router.get('/items', authenticateToken, async (req, res) => {
  try {
    const userId = req.query.userId; // Retrieve userId from the query parameter
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const items = await Item.find({ userId }); // Fetch items with matching userId
    res.status(200).json({
      message: 'Items retrieved successfully',
      items,
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


module.exports = router;
