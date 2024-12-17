const mongoose = require('mongoose');

const businessProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
}, {
    timestamps: true,
});

const BusinessProfile = mongoose.model('BusinessProfile', businessProfileSchema);
module.exports = BusinessProfile;