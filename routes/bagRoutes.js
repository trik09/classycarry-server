const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createBag, getBags, getBagById, updateBag, deleteBag } = require("../controllers/bagController");

const upload = multer(); // in-memory storage

router.post("/", upload.any(), createBag);
router.get("/", getBags);
router.get("/:id", getBagById);
router.put("/:id", upload.any(), updateBag);
router.delete("/:id", deleteBag);

module.exports = router;
