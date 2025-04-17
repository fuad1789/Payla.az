import express, { Request, Response, Router } from "express";
import Category from "../models/Category";
import { isAuthenticated, isAdmin } from "../middleware/auth";

const router: Router = express.Router();

interface CategoryBody {
  name: string;
  icon: string;
  parentId?: string;
  isActive?: boolean;
}

// Get all categories
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

// Create new category (admin only)
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  async (req: Request<{}, any, CategoryBody>, res: Response): Promise<void> => {
    try {
      const { name, icon, parentId } = req.body;
      const category = new Category({
        name,
        icon,
        parentId: parentId || null,
      });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Error creating category", error });
    }
  }
);

// Update category (admin only)
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  async (
    req: Request<{ id: string }, any, CategoryBody>,
    res: Response
  ): Promise<void> => {
    try {
      const { name, icon, parentId, isActive } = req.body;
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name,
          icon,
          parentId,
          isActive,
        },
        { new: true }
      );
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Error updating category", error });
    }
  }
);

// Delete category (admin only)
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting category", error });
    }
  }
);

// Get category by ID
router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Error fetching category", error });
    }
  }
);

// Get category by slug
router.get(
  "/slug/:slug",
  async (req: Request<{ slug: string }>, res: Response): Promise<void> => {
    console.log("Received request for category with slug:", req.params.slug);
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      console.log("Database query result:", category);

      if (!category) {
        console.log("No category found for slug:", req.params.slug);
        res.status(404).json({
          status: "fail",
          message: "Category not found",
        });
        return;
      }

      console.log("Returning category:", category);
      res.json({
        status: "success",
        data: {
          category,
        },
      });
    } catch (error) {
      console.error("Error in category by slug route:", error);
      res.status(400).json({
        status: "fail",
        message: "Error fetching category",
        error,
      });
    }
  }
);

export default router;
