const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Get all books
router.get("/", bookController.getAllBooks);

// Add a book
router.post("/", bookController.addBook);

// Update book by ID
router.put("/:id", bookController.updateBook);

// Delete book by title
router.delete("/deleteByName/:title", bookController.deleteBookByTitle);

module.exports = router;
