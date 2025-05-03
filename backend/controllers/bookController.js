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
    const { Title, Author, Genre, ISBN, Quantity } = req.body;
    const sql = 'INSERT INTO Books (Title, Author, Genre, ISBN, Quantity) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [Title, Author, Genre, ISBN, Quantity], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Book added successfully!");
    });
};

// Update a book
exports.updateBook = (req, res) => {
    const BookID = req.params.id;
    const { Title, Author, Genre, ISBN, Quantity } = req.body;
    const sql = 'UPDATE Books SET Title = ?, Author = ?, Genre = ?, ISBN = ?, Quantity = ? WHERE BookID = ?';
    db.query(sql, [Title, Author, Genre, ISBN, Quantity, BookID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Book updated successfully!");
    });
};

// Delete a book by Title
exports.deleteBookByTitle = (req, res) => {
    const title = req.params.title.trim();
    console.log("Deleting book:", title);

    const sql = 'DELETE FROM Books WHERE Title = ?';
    db.query(sql, [title], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found." });
        }

        res.json({ message: "Book deleted successfully!" });
    });
};
