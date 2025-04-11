require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API to Fetch All Books
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// API to Add a Book
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const sql = 'INSERT INTO books (title, author, year) VALUES (?, ?, ?)';
    db.query(sql, [title, author, year], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Book added successfully');
        }
    });
});

// API to Delete a Book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Book deleted successfully');
        }
    });
});

// Start Server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
