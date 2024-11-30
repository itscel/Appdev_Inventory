const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"] })); 
app.use(bodyParser.json()); 

// Routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Start the server and sync the database
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }) 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
