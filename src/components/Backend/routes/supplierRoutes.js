// routes/supplierRoutes.js
const express = require("express");
const mongoose = require('mongoose');
const Supplier = require("../models/Supplier"); // Assuming the Supplier model exists
const router = express.Router();

// Add new supplier route
router.post("/add", async (req, res) => {
    try {
        const { companyName, contactInfo, email } = req.body;

        if (!companyName || !contactInfo || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create new supplier with provided data
        const newSupplier = new Supplier({
            companyName,
            contactInfo,
            email,
        });

        // Save supplier to the MongoDB collection
        await newSupplier.save();

        res.status(201).json({
            message: "Supplier added successfully",
            supplier: {
                id: newSupplier._id,
                companyName: newSupplier.companyName,
                contactInfo: newSupplier.contactInfo,
                email: newSupplier.email,
            },
        });
    } catch (error) {
        console.error("Error in adding supplier:", error);
        res.status(500).json({ error: "Failed to add supplier" });
    }
});

// Get all suppliers
router.get("/sup", async (req, res) => {
    try {
        const suppliers = await Supplier.find(); // Fetch all suppliers from MongoDB
        res.json(suppliers); // Send suppliers as response
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        res.status(500).json({ message: 'Error fetching suppliers' });
    }
});

module.exports = router;
