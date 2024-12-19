const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', 
    }],
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
