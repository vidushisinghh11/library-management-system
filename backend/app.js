const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/books');
const adminRoutes = require('./routes/admins');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/books', bookRoutes);
app.use('/api/admins', adminRoutes);

// Serve frontend (static files)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start server
app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});
    

