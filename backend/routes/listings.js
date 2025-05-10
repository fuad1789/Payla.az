const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const upload = require("../middlewares/uploadMiddleware");
const adminAuth = require("../middlewares/adminAuth");

// Public routes
router.get("/", listingController.getListings);
router.get("/:id", listingController.getListingById);
router.post("/:id/contact", listingController.incrementContactCount);

// Admin routes (protected)
router.post(
  "/",
  adminAuth,
  upload.array("images", 10),
  listingController.createListing
);
router.put(
  "/:id",
  adminAuth,
  upload.array("images", 10),
  listingController.updateListing
);
router.delete("/:id", adminAuth, listingController.deleteListing);

module.exports = router;
