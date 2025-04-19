const db = require('../config/db');

// Get all books
exports.getBooks = (req, res) => {
    db.query('SELECT * FROM Books', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Add a book
exports.addBook = (req, res) => {
    const { Title, Author, Genre, ISBN, PublishedYear, Quantity } = req.body;
    const sql = 'INSERT INTO Books (Title, Author, Genre, ISBN, PublishedYear, Quantity) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Title, Author, Genre, ISBN, PublishedYear, Quantity], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Book added successfully!");
    });
};

// Update a book
exports.updateBook = (req, res) => {
    const BookID = req.params.id;
    const { Title, Author, Genre, ISBN, PublishedYear, Quantity } = req.body;
    const sql = 'UPDATE Books SET Title = ?, Author = ?, Genre = ?, ISBN = ?, PublishedYear = ?, Quantity = ? WHERE BookID = ?';
    db.query(sql, [Title, Author, Genre, ISBN, PublishedYear, Quantity, BookID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Book updated successfully!");
    });
};

// Delete a book
exports.deleteBook = (req, res) => {
    const BookID = req.params.id;
    db.query('DELETE FROM Books WHERE BookID = ?', [BookID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Book deleted successfully!");
    });
};
