const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "wedding-dresses", // 👰‍♀️ Gəlinliklər
        "men-suits", // 🤵 Kişi kostyumları
        "women-clothing", // 👗 Qadın geyimləri
        "shoes", // 👠 Ayaqqabılar
        "jewelry", // 💍 Zinət əşyaları
        "bags-accessories", // 👜 Çantalar və aksesuarlar
        "kids-clothing", // 👶 Uşaq geyimləri
        "themed-clothing", // 🎭 Tematik geyimlər
      ],
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          return val && val.length > 0;
        },
        message: "At least one image is required",
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    contacts: {
      type: Number,
      default: 0,
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
