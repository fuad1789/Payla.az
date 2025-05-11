const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Routes
const listingRoutes = require("./routes/listings");
const adminRoutes = require("./routes/admin");
const businessProfileRoutes = require("./routes/businessProfiles");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/listings", listingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/business-profiles", businessProfileRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Paylaş API is running");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
