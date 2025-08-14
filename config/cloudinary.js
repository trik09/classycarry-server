// config/cloudinary.js
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadBuffer = async (buffer, folder) => {
  try {
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;
    return await cloudinary.uploader.upload(dataUri, { folder });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

module.exports = { cloudinary, uploadBuffer };
