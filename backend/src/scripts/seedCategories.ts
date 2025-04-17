import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category";

dotenv.config();

const categories = [
  {
    name: "Bütün məhsullar",
    icon: "/svgs/all_items.svg",
    slug: "all",
    isActive: true,
  },
  {
    name: "Gözəllik və Sağlamlıq",
    icon: "/svgs/Health.svg",
    slug: "health",
    isActive: true,
  },
  {
    name: "Oyun konsolları",
    icon: "/svgs/game_consoles.svg",
    slug: "gaming",
    isActive: true,
  },
  {
    name: "Uşaq məhsulları",
    icon: "/svgs/child.svg",
    slug: "kids",
    isActive: true,
  },
  {
    name: "Telefon və aksesuarlar",
    icon: "/svgs/phone.svg",
    slug: "phones",
    isActive: true,
  },
  {
    name: "Kompüter və aksesuarları",
    icon: "/svgs/computer.svg",
    slug: "computers",
    isActive: true,
  },
  {
    name: "Aksesuarlar",
    icon: "/svgs/acsessuars.svg",
    slug: "accessories",
    isActive: true,
  },
  {
    name: "Kampaniyalar",
    icon: "/svgs/kampanya.svg",
    slug: "campaigns",
    isActive: true,
  },
];

async function seedCategories() {
  try {
    // Connect to MongoDB using URI from .env
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Delete existing categories
    await Category.deleteMany({});
    console.log("Deleted existing categories");

    // Insert new categories
    await Category.insertMany(categories);
    console.log("Successfully seeded categories");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
}

seedCategories();
