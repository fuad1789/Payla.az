const BusinessProfile = require("../models/BusinessProfile");
const Listing = require("../models/Listing");

// Bütün business profilləri gətir
exports.getBusinessProfiles = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find().sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Slug ilə business profili və əlaqəli elanları gətir
exports.getBusinessProfileBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const profile = await BusinessProfile.findOne({ slug });
    if (!profile)
      return res.status(404).json({ message: "Business profile tapılmadı" });
    const listings = await Listing.find({
      businessProfileId: profile._id,
      isActive: true,
    });
    res.status(200).json({ profile, listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni business profili yarat
exports.createBusinessProfile = async (req, res) => {
  try {
    let { name, slug, description, imageUrl } = req.body;
    if (!name || !description)
      return res.status(400).json({ message: "Ad və təsvir tələb olunur" });
    // Slug avtomatik generasiya olunsun əgər verilməyibsə
    if (!slug)
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    // Slug unikal olmalıdır
    const exists = await BusinessProfile.findOne({ slug });
    if (exists)
      return res.status(409).json({ message: "Slug artıq mövcuddur" });
    const profile = new BusinessProfile({ name, slug, description, imageUrl });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Business profili redaktə et
exports.updateBusinessProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, imageUrl } = req.body;
    const profile = await BusinessProfile.findById(id);
    if (!profile)
      return res.status(404).json({ message: "Business profile tapılmadı" });
    if (name) profile.name = name;
    if (description) profile.description = description;
    if (typeof imageUrl !== "undefined") profile.imageUrl = imageUrl;
    if (slug && slug !== profile.slug) {
      // Yeni slug unikal olmalıdır
      const exists = await BusinessProfile.findOne({ slug });
      if (exists)
        return res.status(409).json({ message: "Slug artıq mövcuddur" });
      profile.slug = slug;
    }
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Business profili sil
exports.deleteBusinessProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await BusinessProfile.findById(id);
    if (!profile)
      return res.status(404).json({ message: "Business profile tapılmadı" });
    await profile.deleteOne();
    res.status(200).json({ message: "Business profile silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
