const express = require("express");
const mongoose = require('mongoose');
const User = require("../models/User");
const Supplier = require("../models/Supplier");
const Item = require("../models/Item"); 
const router = express.Router();

// Add new item route
router.post('/add', async (req, res) => {
  try {
    console.log('Raw Request Body:', req.body); 
    const { name, price, sizes, category, subCategory, supplierId, userId } = req.body;

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
      user: userId, 
    });

    await newItem.save();

    const { createdAt, updatedAt } = newItem; 

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

// Get all items route 
router.get('/items/all', async (req, res) => {
  try {
    const items = await Item.find(); 
    res.json(items); 
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

router.get('/items', async (req, res) => {
  const userId = req.query.userId;  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    
    const userObjectId = mongoose.Types.ObjectId(userId);

    
    const items = await Item.find({ user: userObjectId });

    
    res.json({ message: 'Items retrieved successfully', items });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
});
// Update item by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params; 
  const { name, price, sizes } = req.body; 

  try {
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid item ID" });
      }

      
      const updatedItem = await Item.findByIdAndUpdate(
          id,
          { name, price, sizes },
          { new: true, runValidators: true } 
      );

      if (!updatedItem) {
          return res.status(404).json({ error: "Item not found" });
      }

      res.json({
          message: "Item updated successfully",
          item: updatedItem,
      });
  } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Failed to update item" });
  }
});

// Delete item by ID
router.delete("/delete/:id", async (req, res) => {
  try {
      const { id } = req.params; 

      
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid item ID" });
      }

      
      const deletedItem = await Item.findByIdAndDelete(id);

      if (!deletedItem) {
          return res.status(404).json({ error: "Item not found" });
      }

      res.json({
          message: "Item deleted successfully",
          item: deletedItem, 
      });
  } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
