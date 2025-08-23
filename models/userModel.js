const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male","female"] },
  phone: { type: String },
  pan: { type: String },
  avatar: { type: String },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
