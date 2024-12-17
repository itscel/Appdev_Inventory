const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // User model
const BusinessProfile = require("../models/BusinessProfile"); // BusinessProfile model
const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, companyName, address, contactNumber } = req.body;

        if (!fullName || !email || !password || !companyName || !address || !contactNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ error: "User  already exists" });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser  = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save(); 
        const newBusinessProfile = new BusinessProfile({
            userId: newUser._id,
            companyName,
            address,
            contactNumber,
        });

        await newBusinessProfile.save();
        newUser.businessProfile = newBusinessProfile._id;
        await newUser.save();

        res.status(201).json({
            message: "User  registered successfully",
            user: { id: newUser._id, email: newUser.email }, 
        });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User  not found" });
        }

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, "default_secret", {
            expiresIn: "1h",
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

module.exports = router;