

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/category");
const bagRoutes = require("./routes/bagRoutes");


// app.use(cors({
//   origin:  ["http://localhost:3000", "http://localhost:3001"],
//   credentials: true, 
// }));

app.use(cors({
  origin: "*",
  credentials: true,
}));


app.use(express.json());

// Use Routes
app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bags", bagRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected to Atlas");
    app.listen(process.env.PORT || 8000, () => {
      console.log("🚀 Server running on port", process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed:", err);
  });
