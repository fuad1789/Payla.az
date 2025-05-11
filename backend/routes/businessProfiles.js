const express = require("express");
const router = express.Router();
const businessProfileController = require("../controllers/businessProfileController");
const adminAuth = require("../middlewares/adminAuth");

// Public: slug ilə business profili və elanları gətir
router.get("/slug/:slug", businessProfileController.getBusinessProfileBySlug);

// Public: bütün business profilləri (istəyə görə adminAuth əlavə oluna bilər)
router.get("/", businessProfileController.getBusinessProfiles);

// Admin: business profile yarat
router.post("/", adminAuth, businessProfileController.createBusinessProfile);

// Admin: business profile redaktə et
router.put("/:id", adminAuth, businessProfileController.updateBusinessProfile);

// Admin: business profile sil
router.delete(
  "/:id",
  adminAuth,
  businessProfileController.deleteBusinessProfile
);

module.exports = router;
