const Bag = require('../models/bagModel');
const Category = require('../models/categoryModel');
const { uploadBuffer } = require('../config/cloudinary');

// CREATE Bag
exports.createBag = async (req, res) => {
  try {
    const { name, category: categoryId, gender, price, description, returnPolicy } = req.body;
    const isActive = req.body.isActive === 'false' ? false : Boolean(req.body.isActive);

    // parse colors
    const colorsRaw = req.body.colors || '[]';
    let colorsArr;
    try { colorsArr = JSON.parse(colorsRaw); }
    catch (e) { return res.status(400).json({ success:false, message: 'Invalid colors JSON' }); }

    // validate category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ success: false, message: 'Category not found' });

    const files = req.files || [];
    const colors = [];

    for (let i = 0; i < colorsArr.length; i++) {
      const { name: cname, hex } = colorsArr[i];
      const fieldName = `color_${i}`;
      const colorFiles = files.filter(f => f.fieldname === fieldName);

      const uploadedUrls = [];
      for (const file of colorFiles) {
        const uploaded = await uploadBuffer(file.buffer, `bags/${category.slug || category._id}/${name}`);
        if (uploaded && uploaded.secure_url) uploadedUrls.push(uploaded.secure_url);
      }

      colors.push({ name: cname, hex, images: uploadedUrls });
    }

    const bag = new Bag({
      name, category: categoryId, gender, price,
      description, returnPolicy, isActive, colors
    });
    await bag.save();
    res.status(201).json({ success: true, bag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET Bags
exports.getBags = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const q = {};
    if (category) q.category = category;
    if (search) q.name = { $regex: search, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);
    const bags = await Bag.find(q).populate('category').sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    const total = await Bag.countDocuments(q);
    res.json({ success: true, bags, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET Bag By Id
exports.getBagById = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id).populate('category');
    if (!bag) return res.status(404).json({ success: false, message: 'Bag not found' });
    res.json({ success: true, bag });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE Bag
exports.updateBag = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, price, oldPrice, isActive, colors } = req.body;

    const updatedColors = colors ? JSON.parse(colors) : undefined;
    const files = req.files || [];

    // handle uploaded images for colors
    if (updatedColors) {
      for (let i = 0; i < updatedColors.length; i++) {
        const fieldName = `color_${i}`;
        const colorFiles = files.filter(f => f.fieldname === fieldName);
        const uploadedUrls = [];

        for (const file of colorFiles) {
          const uploaded = await uploadBuffer(file.buffer, `bags/${category || ''}/${name || ''}`);
          if (uploaded && uploaded.secure_url) uploadedUrls.push(uploaded.secure_url);
        }

        if (!updatedColors[i].images) updatedColors[i].images = [];
        updatedColors[i].images.push(...uploadedUrls);
      }
    }

    const updated = await Bag.findByIdAndUpdate(
      id,
      {
        category,
        name,
        price,
        oldPrice,
        isActive,
        ...(updatedColors && { colors: updatedColors })
      },
      { new: true }
    ).populate("category", "name");

    res.json({ success: true, bag: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE Bag
exports.deleteBag = async (req, res) => {
  try {
    const { id } = req.params;
    await Bag.findByIdAndDelete(id);
    res.json({ success: true, message: "Bag deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
