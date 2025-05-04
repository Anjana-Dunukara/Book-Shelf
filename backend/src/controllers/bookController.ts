import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Book from "../models/bookModel.js";

// @desc    Get all books
// @route   GET /api/books
// @access  Private
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a book by ID
// @route   GET /api/books/:id
// @access  Private
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.userId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
export const createBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, author, genre, publicationDate } = req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      publicationDate,
      user: req.userId,
    });

    res.status(201).json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
export const updateBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, author, genre, publicationDate } = req.body;

    // Find book
    let book = await Book.findOne({ _id: req.params.id, user: req.userId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update book
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.publicationDate = new Date(publicationDate);
    await book.save();

    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.userId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
