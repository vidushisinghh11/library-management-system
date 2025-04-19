const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// ✅ Student Registration (insert into Users)
exports.registerStudent = async (req, res) => {
  try {
    const { studentName, email, password } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    const sql = `
      INSERT INTO Users (Name, Email, Role, PasswordHash)
      VALUES (?, ?, 'Student', ?)
    `;

    db.query(sql, [studentName, email, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Student registered successfully!' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
};

// ✅ Login (Admin or Student)
exports.login = (req, res) => {
  const { userID, password, isAdmin } = req.body;

  const table = isAdmin ? 'Admins' : 'Users';
  const idField = 'Email'; // using email as login ID

  const sql = `SELECT * FROM ${table} WHERE ${idField} = ?`;

  db.query(sql, [userID], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!results || results.length === 0) {
      console.warn("⚠️ No such user found");
      return res.status(401).json({ error: 'No such account' });
    }

    const user = results[0];

    try {
      const match = await bcrypt.compare(password, user.PasswordHash);

      if (!match) {
        console.warn("⚠️ Password does not match");
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log("✅ Login successful for:", user.Email);

      return res.status(200).json({
        message: 'Login successful!',
        user: {
          id: isAdmin ? user.AdminID : user.UserID,
          role: isAdmin ? 'Admin' : user.Role
        }
      });
    } catch (err) {
      console.error("❌ Error during password comparison:", err);
      return res.status(500).json({ error: 'Server error during login' });
    }
  });
};

