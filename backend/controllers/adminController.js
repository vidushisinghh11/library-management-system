const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO Admins (Name, Email, PasswordHash) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Admin registered successfully!" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM Admins WHERE Email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results.length) return res.status(401).json({ error: "No such admin" });

    const admin = results[0];

    const match = await bcrypt.compare(password, admin.PasswordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", admin: { id: admin.AdminID, name: admin.Name } });
  });
};
