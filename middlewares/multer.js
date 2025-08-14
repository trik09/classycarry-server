// middlewares/multer.js
const multer = require('multer');

const storage = multer.memoryStorage(); // store file in memory buffer
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Only image files allowed'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB per file

module.exports = upload;
