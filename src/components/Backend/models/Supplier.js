const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
