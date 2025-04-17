import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { isAuthenticated } from "../middleware/auth";

const router: Router = express.Router();

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

// Register
router.post("/register", async (req: Request<{}, any, RegisterBody>, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Only allow admin role if it's explicitly set and there are no existing users
    let userRole = "user";
    if (role === "admin") {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        userRole = "admin";
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Login
router.post("/login", async (req: Request<{}, any, LoginBody>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Get current user
router.get("/me", isAuthenticated, async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export default router;
