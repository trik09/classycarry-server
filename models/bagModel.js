const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, default: "#000000" },
  images: [{ type: String }],
}, { _id: false });

const bagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Unisex'], default: 'Unisex' },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  description: { type: String },
  returnPolicy: { type: String },
  isActive: { type: Boolean, default: true },
  colors: [colorSchema],
}, { timestamps: true });

module.exports = mongoose.model('Bag', bagSchema);
