const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');  // User routes for registration/login

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);  // User routes for registration/login

// Serve frontend (static files)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start server
app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});
    