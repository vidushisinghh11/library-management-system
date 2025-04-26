const db = require('../config/db');

// 📚 Issue Book
exports.issueBook = (req, res) => {
  const { adminID, bookID, issueDate, dueDate } = req.body;
  const sql = `INSERT INTO Transactions (AdminID, BookID, IssueDate, DueDate) VALUES (?, ?, ?, ?)`;

  db.query(sql, [adminID, bookID, issueDate, dueDate], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Book issued successfully!" });
  });
};

// 🔄 Return Book
exports.returnBook = (req, res) => {
  const { transactionID, returnDate } = req.body;

  const sql = `
    UPDATE Transactions
    SET ReturnDate = ?, 
        Status = 'Returned', 
        Fine = CalculateFine(DueDate, ?)
    WHERE TransactionID = ?
  `;

  db.query(sql, [returnDate, returnDate, transactionID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found!" });
    }

    res.json({ message: "Book returned successfully!" });
  });
};

// 📄 Get All Transactions (History)
exports.getTransactions = (req, res) => {
  const sql = `SELECT * FROM AdminTransactions`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
