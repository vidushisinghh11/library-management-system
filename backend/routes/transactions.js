const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// 📚 Routes
router.post('/issue', transactionController.issueBook);   // /api/transactions/issue
router.post('/return', transactionController.returnBook); // /api/transactions/return
router.get('/', transactionController.getTransactions);   // /api/transactions/

module.exports = router;
