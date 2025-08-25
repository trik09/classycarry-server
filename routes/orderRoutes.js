// const express = require("express");
// const router = express.Router();

// const {
//   placeOrder,
//   getUserOrders,
//   getAllOrders,
//   updateOrderStatus,
//   getOrderById,
// } = require("../controllers/orderController.js");

// const { protect, adminOnly } = require("../middlewares/authMiddleware.js");

// // Place Order (User)
// router.post("/", protect, placeOrder);

// // Get My Orders (User)
// router.get("/my-orders", protect, getUserOrders);

// // Get All Orders (Admin)
// // router.get("/", protect, adminOnly, getAllOrders);
// router.get("/", protect, getAllOrders);


// // Update Order Status (Admin)
// router.patch("/:id", protect, updateOrderStatus);

// // Get Single Order (Admin)
// router.get("/:id", protect, getOrderById);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/orderController.js");

const { protect } = require("../middlewares/authMiddleware.js");

// Place Order (User)
router.post("/", placeOrder);

// Get My Orders (User)
router.get("/my-orders", getUserOrders);

// Get All Orders
router.get("/", getAllOrders);

// Update Order Status
router.patch("/:id", updateOrderStatus);

// Get Single Order
router.get("/:id", getOrderById);

module.exports = router;
