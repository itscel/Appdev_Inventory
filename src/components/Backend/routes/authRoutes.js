const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, businessName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ email, password: hashedPassword, business_name: businessName });
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ error: "Registration failed." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials!" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
