const db = require('../config/db');

exports.getAllBooks = (req, res) => {
    const sql = "SELECT * FROM Books";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addBook = (req, res) => {
    const { Title, Author, Genre, ISBN, Quantity } = req.body;
    const sql = "INSERT INTO Books (Title, Author, Genre, ISBN, Quantity) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [Title, Author, Genre, ISBN, Quantity], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send("Book added successfully");
    });
};

exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { Title, Author, Genre, ISBN, Quantity } = req.body;
    const sql = "UPDATE Books SET Title = ?, Author = ?, Genre = ?, ISBN = ?, Quantity = ? WHERE BookID = ?";
    db.query(sql, [Title, Author, Genre, ISBN, Quantity, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send("Book updated successfully");
    });
};

exports.deleteBookByTitle = (req, res) => {
    const { title } = req.params;
    const sql = "DELETE FROM Books WHERE Title = ?";
    db.query(sql, [title], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    });
};