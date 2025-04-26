const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Routes
router.post('/issue', transactionController.issueBook);
router.post('/return', transactionController.returnBook);
router.get('/', transactionController.getTransactions);

module.exports = router;
