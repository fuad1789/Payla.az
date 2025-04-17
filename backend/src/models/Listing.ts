import mongoose, { Document, Model } from "mongoose";

interface IListing extends Document {
  title: string;
  description: string;
  image: string;
  category: mongoose.Types.ObjectId;
  pricePerDay: number;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
}

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please select a category"],
  },
  pricePerDay: {
    type: Number,
    required: [true, "Please provide a price per day"],
    min: [0, "Price must be a positive number"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing: Model<IListing> = mongoose.model<IListing>(
  "Listing",
  listingSchema
);

export default Listing;
