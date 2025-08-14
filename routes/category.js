// routes/category.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // uses memoryStorage
const categoryController = require('../controllers/categoryController');

// Admin routes (protect with auth middleware later)
router.post('/', upload.single('image'), categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
