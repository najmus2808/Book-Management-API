const Book = require("../models/book");

exports.createHandler = async (req, res) => {
  const { title, author, description, publishedYear } = req.body;

  try {
    // Validate required fields
    if (!title || !author) {
      return res
        .status(400)
        .json({ error: "Title and author are required fields." });
    }

    // Create a new book
    const book = new Book({
      title,
      author,
      description,
      publishedYear,
    });

    // Save the book to the database
    await book.save();

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create the book." });
  }
};

exports.readHandler = async (req, res) => {
  try {
    // Retrieve all books
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve books." });
  }
};

exports.readByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate book ID
    if (!id) {
      return res.status(400).json({ error: "Book ID is required." });
    }

    // Retrieve book by ID
    const book = await Book.findById(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve the book." });
  }
};

exports.updateHandler = async (req, res) => {
  const { id } = req.params || {};
  const { title, author, description, publishedYear } = req.body || {};

  try {
    // Validate book ID
    if (!id) {
      return res.status(400).json({ error: "Book ID is required." });
    }

    // Validate required fields
    if (!title && !author) {
      return res
        .status(400)
        .json({ error: "At least one of title or author is required." });
    }

    // Retrieve book by ID
    let book = await Book.findById(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    // Update book fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.publishedYear = publishedYear || book.publishedYear;

    // Save the updated book
    book = await book.save();

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the book." });
  }
};

exports.deleteHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate book ID
    if (!id) {
      return res.status(400).json({ error: "Book ID is required." });
    }

    // Retrieve book by ID
    const book = await Book.findById(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    // Delete the book
    await Book.findByIdAndDelete(id);

    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete the book." });
  }
};