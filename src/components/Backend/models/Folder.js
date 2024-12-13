const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure folder names are unique
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', // Reference to the Item model
    }],
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
