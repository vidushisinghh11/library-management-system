const db = require('../config/db');

// 📚 Issue Book
exports.issueBook = (req, res) => {
  const { adminID, bookID, issueDate, dueDate } = req.body;

  if (!adminID || !bookID || !issueDate || !dueDate) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql = `
    INSERT INTO Transactions (AdminID, BookID, IssueDate, DueDate)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [adminID, bookID, issueDate, dueDate], (err, result) => {
    if (err) {
      console.error("Error issuing book:", err);
      return res.status(500).json({ error: "Database error!" });
    }
    res.json({ message: "Book issued successfully!" });
  });
};

// 🔄 Return Book
exports.returnBook = (req, res) => {
  const { transactionID, returnDate } = req.body;

  if (!transactionID || !returnDate) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql = `
    UPDATE Transactions
    SET ReturnDate = ?, 
        Status = 'Returned',
        Fine = CalculateFine(DueDate, ?)
    WHERE TransactionID = ?
  `;

  db.query(sql, [returnDate, returnDate, transactionID], (err, result) => {
    if (err) {
      console.error("Error returning book:", err);
      return res.status(500).json({ error: "Database error!" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found!" });
    }
    res.json({ message: "Book returned successfully!" });
  });
};

// 📄 Fetch All Transaction History
exports.getTransactions = (req, res) => {
  const sql = `SELECT * FROM AdminTransactions`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ error: "Database error!" });
    }
    res.json(results);
  });
};
