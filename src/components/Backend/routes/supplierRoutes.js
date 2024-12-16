const express = require("express");
const mongoose = require('mongoose');
const Supplier = require("../models/Supplier"); // Assuming the Supplier model exists
const router = express.Router();

// Add new supplier route
router.post("/add", async (req, res) => {
    try {
        // Log the raw request body for debugging
        console.log('Raw Request Body:', req.body);

        const { companyName, contactInfo, email, address, userId } = req.body;

        // Log the destructured data
        console.log('Destructured Data:', { companyName, contactInfo, email, address, userId });

        // Check if all required fields are present
        if (!companyName || !contactInfo || !email || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create new supplier with provided data
        const newSupplier = new Supplier({
            companyName,
            contactInfo,
            email,
            address, // Address field
            user: userId,
        });

        // Save supplier to the MongoDB collection
        await newSupplier.save();

        // Destructure the necessary fields, including timestamps
        const { createdAt, updatedAt } = newSupplier; // Access createdAt and updatedAt fields

        // Send response
        res.status(201).json({
            message: "Supplier added successfully",
            supplier: {
                id: newSupplier._id,
                companyName: newSupplier.companyName,
                contactInfo: newSupplier.contactInfo,
                email: newSupplier.email,
                address: newSupplier.address, // Address field
                userId: newSupplier.user,
                createdAt, // Auto-generated createdAt timestamp
                updatedAt, // Auto-generated updatedAt timestamp
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
//Supplier from user id
router.get('/supplier', async (req, res) => {
    const userId = req.query.userId;  // Extract userId from query parameters
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
        // Convert userId to ObjectId if it's a string
        const userObjectId = mongoose.Types.ObjectId(userId);

        // Fetch suppliers for the specified userId from the database
        const suppliers = await Supplier.find({ user: userObjectId });

        // Return the suppliers in the response
        res.json({ message: 'Suppliers retrieved successfully', suppliers });
    } catch (err) {
        console.error('Error fetching suppliers:', err);
        res.status(500).json({ error: 'Failed to fetch suppliers.' });
    }
});


module.exports = router;
