const Order = require("../models/orderModel.js");

// Place Order
// Place Order
const placeOrder = async (req, res) => {
  try {
    const { product, quantity, color, totalAmount, paymentMethod, address } = req.body;

    const order = new Order({
      user: req.user._id,
      product,
      quantity,
      color,
      address,
      paymentMethod,
      totalAmount,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// Get all orders (Admin)
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name email");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("product"); // populate product details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("product"); // <-- populate product details

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Order By ID (Admin)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById, // add here
};


// module.exports = {
//   placeOrder,
//   getAllOrders,
//   getUserOrders,
//   updateOrderStatus,
// };
