const mongoose = require("mongoose"); // ← ADD THIS

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bag", // or your product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    selectedImage: {  // optional, store selected image
      type: String,
    },
    address: {
      name: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
