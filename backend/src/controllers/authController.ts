import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";

// Generate JWT token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Send response
    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    // Find user by credentials
    try {
      const user = await User.findByCredentials(email, password);

      // Generate token
      const token = generateToken((user._id as string).toString());

      // Send response
      res.status(200).json({
        user: {
          id: user._id,
          username: user.get("username"),
          email: user.get("email"),
        },
        token,
      });
    } catch (error) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
