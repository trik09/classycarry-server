// controllers/categoryController.js
const Category = require('../models/categoryModel');
const { uploadBuffer } = require('../config/cloudinary');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl = null;
    if (req.file) {
      const uploaded = await uploadBuffer(req.file.buffer, 'categories');
      imageUrl = uploaded.secure_url;
    }
    const cat = new Category({ name, image: imageUrl });
    await cat.save();
    res.status(201).json({ success: true, category: cat });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, category: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const update = { name };
    if (req.file) {
      const uploaded = await uploadBuffer(req.file.buffer, 'categories');
      update.image = uploaded.secure_url;
    }
    const cat = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, category: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
