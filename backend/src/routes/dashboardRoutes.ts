import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/auth";
import Listing from "../models/Listing";
import User from "../models/User";

const router = express.Router();

// Get user's listings with stats
router.get(
  "/listings",
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const listings = await Listing.find({ owner: req.user._id })
        .populate("category", "name")
        .sort("-createdAt");

      res.json({
        success: true,
        data: listings,
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
);

// Get listing stats
router.get(
  "/listings/:id/stats",
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const listing = await Listing.findOne({
        _id: req.params.id,
        owner: req.user._id,
      }).populate("contactClicks.user", "name email");

      if (!listing) {
        res.status(404).json({
          success: false,
          error: "Listing not found",
        });
        return;
      }

      res.json({
        success: true,
        data: {
          viewCount: listing.viewCount,
          contactClicks: listing.contactClicks,
        },
      });
    } catch (error) {
      console.error("Error fetching listing stats:", error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
);

// Update listing
router.put(
  "/listings/:id",
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, pricePerDay } = req.body;

      const listing = await Listing.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!listing) {
        res.status(404).json({
          success: false,
          error: "Listing not found",
        });
        return;
      }

      listing.title = title || listing.title;
      listing.description = description || listing.description;
      listing.pricePerDay = pricePerDay || listing.pricePerDay;

      await listing.save();

      res.json({
        success: true,
        data: listing,
      });
    } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
);

// Log contact click
router.post(
  "/listings/:id/contact",
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const listing = await Listing.findById(req.params.id);

      if (!listing) {
        res.status(404).json({
          success: false,
          error: "Listing not found",
        });
        return;
      }

      // Add contact click
      listing.contactClicks.push({
        user: req.user._id,
        timestamp: new Date(),
      });

      await listing.save();

      res.json({
        success: true,
        message: "Contact click logged successfully",
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
);

// Increment view count
router.post(
  "/listings/:id/view",
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const listing = await Listing.findById(req.params.id);

      if (!listing) {
        res.status(404).json({
          success: false,
          error: "Listing not found",
        });
        return;
      }

      listing.viewCount += 1;
      await listing.save();

      res.json({
        success: true,
        message: "View count incremented successfully",
      });
    } catch (error) {
      console.error("Error recording view:", error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
);

export default router;
