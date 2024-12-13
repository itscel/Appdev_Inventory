// models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
