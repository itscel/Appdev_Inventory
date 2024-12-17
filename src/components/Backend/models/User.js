const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // added a reference to the business profile if needed
    businessProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessProfile',
    },
});

const User = mongoose.model('User ', userSchema);
module.exports = User;