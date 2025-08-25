const { register, login, getAllUsers, getProfile, updateProfile, logout } = require("../controllers/authController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", protect, logout);  // ✅ Logout route
router.get("/auth/users", protect, adminOnly, getAllUsers);

router.get("/auth/users", getAllUsers);
router.get("/auth/profile", protect, getProfile);
router.patch("/auth/profile", protect, updateProfile);

module.exports = router;
