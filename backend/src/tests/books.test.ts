import request from "supertest";
import app from "../index";
import User from "../models/userModel";
import Book from "../models/bookModel";
import jwt from "jsonwebtoken";

describe("Book Controller", () => {
  let token: string;
  let userId: string;

  const testUser = {
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  };

  const testBook = {
    title: "Test Book",
    author: "Test Author",
    genre: "Fiction",
    publicationDate: "2024-01-01",
  };

  beforeEach(async () => {
    const user = await User.create(testUser);
    userId = user._id.toString();
    token = jwt.sign({ userId }, process.env.JWT_SECRET || "test-secret");
  });

  describe("GET /api/books", () => {
    it("should get all books for authenticated user", async () => {
      await Book.create({ ...testBook, user: userId });

      const res = await request(app)
        .get("/api/books")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty("title", testBook.title);
    });

    it("should return 401 if not authenticated", async () => {
      const res = await request(app).get("/api/books");

      expect(res.status).toBe(401);
    });
  });

  describe("POST /api/books", () => {
    it("should create a new book for authenticated user", async () => {
      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${token}`)
        .send(testBook);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("title", testBook.title);
      expect(res.body).toHaveProperty("user", userId);
    });

    it("should not create book without required fields", async () => {
      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Book",
          // Missing other required fields
        });

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /api/books/:id", () => {
    let bookId: string;

    beforeEach(async () => {
      const book = await Book.create({ ...testBook, user: userId });
      bookId = book._id.toString();
    });

    it("should update an existing book", async () => {
      const updatedData = {
        ...testBook,
        title: "Updated Title",
      };

      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", updatedData.title);
    });

    it("should not update book of another user", async () => {
      const otherUser = await User.create({
        username: "other",
        email: "other@example.com",
        password: "password123",
      });

      const otherBook = await Book.create({
        ...testBook,
        user: otherUser._id,
      });

      const res = await request(app)
        .put(`/api/books/${otherBook._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(testBook);

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/books/:id", () => {
    let bookId: string;

    beforeEach(async () => {
      const book = await Book.create({ ...testBook, user: userId });
      bookId = book._id.toString();
    });

    it("should delete an existing book", async () => {
      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);

      const book = await Book.findById(bookId);
      expect(book).toBeNull();
    });

    it("should not delete book of another user", async () => {
      const otherUser = await User.create({
        username: "other",
        email: "other@example.com",
        password: "password123",
      });

      const otherBook = await Book.create({
        ...testBook,
        user: otherUser._id,
      });

      const res = await request(app)
        .delete(`/api/books/${otherBook._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});
