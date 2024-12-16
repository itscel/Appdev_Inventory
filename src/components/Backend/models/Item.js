const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        sizes: [
            {
                size: { type: String },
                quantity: { type: Number, default: 0 },
            },
        ],
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure this field is correct
    },
    {
        timestamps: true, // This will add `createdAt` and `updatedAt` timestamps
    }
);

module.exports = mongoose.model('Item', ItemSchema);
