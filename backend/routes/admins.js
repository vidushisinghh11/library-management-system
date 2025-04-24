const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');

router.post('/register', adminCtrl.registerAdmin);
router.post('/login', adminCtrl.login);

module.exports = router;
