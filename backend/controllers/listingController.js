const Listing = require("../models/Listing");
const cloudinary = require("../config/cloudinary");

// Get all listings with pagination and filtering
exports.getListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    // Build query
    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Listing.countDocuments(query);

    res.status(200).json({
      listings,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalListings: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single listing by ID
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Increment view count
    listing.views += 1;
    await listing.save();

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function uploadImagesToCloudinary(files) {
  if (!files || files.length === 0) return [];
  const urls = [];
  for (const file of files) {
    const url = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "listings" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
    urls.push(url);
  }
  return urls;
}

// Create a new listing (admin only)
exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      contactInfo,
      businessProfileId,
    } = req.body;

    if (!title || !description || !price || !category || !contactInfo)
      return res.status(400).json({ message: "All fields are required" });

    // Cloudinary-yə şəkilləri yüklə
    const images = await uploadImagesToCloudinary(req.files);
    if (images.length === 0)
      return res
        .status(400)
        .json({ message: "At least one image is required" });

    const newListing = new Listing({
      title,
      description,
      price,
      category,
      images,
      contactInfo: JSON.parse(contactInfo),
      businessProfileId: businessProfileId || null,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a listing (admin only)
exports.updateListing = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      contactInfo,
      isActive,
      keepImages,
      businessProfileId,
    } = req.body;
    const listingId = req.params.id;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Update fields
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (price) listing.price = price;
    if (category) listing.category = category;
    if (contactInfo) listing.contactInfo = JSON.parse(contactInfo);
    if (isActive !== undefined) listing.isActive = isActive;
    if (typeof businessProfileId !== "undefined")
      listing.businessProfileId = businessProfileId || null;

    // Yeni şəkillər varsa Cloudinary-yə yüklə
    if (req.files && req.files.length > 0) {
      const newImages = await uploadImagesToCloudinary(req.files);
      if (keepImages === "true" && listing.images && listing.images.length > 0)
        listing.images = [...listing.images, ...newImages];
      else listing.images = newImages;
    }

    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a listing (admin only)
exports.deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await Listing.deleteOne({ _id: listingId });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment contact count (when user contacts about a listing)
exports.incrementContactCount = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    listing.contacts += 1;
    await listing.save();

    res.status(200).json({
      message: "Contact count incremented",
      contacts: listing.contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
