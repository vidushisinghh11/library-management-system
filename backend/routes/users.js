const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

// Student sign‑up
router.post('/register', userCtrl.registerStudent);

// Login (student or admin)
// Front‑end will pass isAdmin = true for admin form
router.post('/login', userCtrl.login);

module.exports = router;
