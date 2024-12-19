const express = require("express");
const mongoose = require("mongoose");
const Supplier = require("../models/Supplier");
const router = express.Router();

// Add new supplier route
router.post("/add", async (req, res) => {
    try {
        const { companyName, contactInfo, email, address, userId } = req.body;

        if (!companyName || !contactInfo || !email || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newSupplier = new Supplier({
            companyName,
            contactInfo,
            email,
            address,
            user: userId,
        });

        await newSupplier.save();

        const { createdAt, updatedAt } = newSupplier;

        res.status(201).json({
            message: "Supplier added successfully",
            supplier: {
                id: newSupplier._id,
                companyName: newSupplier.companyName,
                contactInfo: newSupplier.contactInfo,
                email: newSupplier.email,
                address: newSupplier.address,
                userId: newSupplier.user,
                createdAt,
                updatedAt,
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
        const suppliers = await Supplier.find();
        res.status(200).json({ count: suppliers.length, data: suppliers });
    } catch (err) {
        console.error("Error fetching suppliers:", err);
        res.status(500).json({ message: "Error fetching suppliers" });
    }
});


// Supplier from user ID
router.get("/supplier", async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    try {
        const userObjectId = mongoose.Types.ObjectId(userId);
        const suppliers = await Supplier.find({ user: userObjectId });

        res.json({ message: "Suppliers retrieved successfully", suppliers });
    } catch (err) {
        console.error("Error fetching suppliers:", err);
        res.status(500).json({ error: "Failed to fetch suppliers." });
    }
});

// Update supplier by ID
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, contactInfo, email, address } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid supplier ID" });
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { companyName, contactInfo, email, address },
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.json({
            message: "Supplier updated successfully",
            supplier: updatedSupplier,
        });
    } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ error: "Failed to update supplier" });
    }
});

// Delete supplier by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid supplier ID" });
        }

        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.json({ message: "Supplier deleted successfully" });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ error: "Failed to delete supplier" });
    }
});

module.exports = router;
