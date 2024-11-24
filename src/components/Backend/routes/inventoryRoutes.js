const express = require('express');
const InventoryItem = require('../models/InventoryItem');
const router = express.Router();

// Add new item
router.post("/add", async (req, res) => {
  const { name, description, stock_level, price, supplier_id } = req.body;
  try {
    const item = await InventoryItem.create({ name, description, stock_level, price, supplier_id });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: "Failed to add inventory item" });
  }
});

// Update inventory item
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, stock_level, price, supplier_id } = req.body;
  try {
    const item = await InventoryItem.update({ name, description, stock_level, price, supplier_id }, { where: { id } });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Inventory item updated" });
  } catch (error) {
    res.status(400).json({ error: "Update failed" });
  }
});

// Delete item
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await InventoryItem.destroy({ where: { id } });
    res.json({ message: "Inventory item deleted" });
  } catch (error) {
    res.status(400).json({ error: "Deletion failed" });
  }
});

router.get("/report/inventory", async (req, res) => {
    const inventory = await InventoryItem.findAll();
    res.json(inventory);
  });
  
module.exports = router;
