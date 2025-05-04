import express from "express";
import { check } from "express-validator";
import { protect } from "../middleware/authMiddleware.js";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.use(protect);

// Get all books
router.get("/", getBooks);

// Get book by ID
router.get("/:id", getBookById);

// Create a new book
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("publicationDate", "Publication date is required").not().isEmpty(),
  ],
  createBook
);

// Update a book
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("publicationDate", "Publication date is required").not().isEmpty(),
  ],
  updateBook
);

// Delete a book
router.delete("/:id", deleteBook);

export default router;
