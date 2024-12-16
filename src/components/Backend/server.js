const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json()); // This is crucial for parsing the request body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inv", inventoryRoutes);
app.use("/api/sup", supplierRoutes);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

// MongoDB Atlas connection
const mongoURI = "mongodb+srv://cerilheyrosa:lcm123MONGODB.@cluster0.w8f6c.mongodb.net/"; // Replace with your Atlas URI

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
