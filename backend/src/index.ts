import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/book-management";

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// API Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Error handler middleware
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

export default app;
