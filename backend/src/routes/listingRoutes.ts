import express, { Request, Response, Router } from "express";
import Listing from "../models/Listing";
import { isAuthenticated } from "../middleware/auth";
import { IUser } from "../models/User";

const router: Router = express.Router();

interface ListingQuery {
  category?: string;
}

interface ListingBody {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
}

interface PopulatedListing extends Document {
  owner: IUser;
}

// Get all listings
router.get(
  "/",
  async (
    req: Request<{}, any, any, ListingQuery>,
    res: Response
  ): Promise<void> => {
    try {
      const { category } = req.query;
      // Don't filter by category if it's "all" or not provided
      const query = category && category !== "all" ? { category } : {};

      const listings = await Listing.find(query)
        .sort({ createdAt: -1 }) // Sort by creation date, newest first
        .populate("owner", "name email")
        .populate("category", "name slug icon");

      res.status(200).json({
        status: "success",
        results: listings.length,
        data: {
          listings,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  }
);

// Get single listing
router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const listing = await Listing.findById(req.params.id)
        .populate("owner", "name email")
        .populate("category", "name slug icon");

      if (!listing) {
        res.status(404).json({
          status: "fail",
          message: "No listing found with that ID",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: {
          listing,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  }
);

// Create listing
router.post(
  "/",
  isAuthenticated,
  async (req: Request<{}, any, ListingBody>, res: Response): Promise<void> => {
    try {
      const listing = await Listing.create({
        ...req.body,
        owner: req.user._id,
      });

      // Populate the category data before sending response
      await listing.populate("category", "name slug icon");
      await listing.populate("owner", "name email");

      res.status(201).json({
        status: "success",
        data: {
          listing,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  }
);

// Get owner's email (simplified contact system)
router.get(
  "/:id/owner-email",
  isAuthenticated,
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const listing = await Listing.findById(req.params.id)
        .populate<{ owner: IUser }>("owner", "email")
        .lean();

      if (!listing) {
        res.status(404).json({
          status: "fail",
          message: "No listing found with that ID",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: {
          email: listing.owner.email,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  }
);

export default router;
