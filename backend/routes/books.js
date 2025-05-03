const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/deleteByName/:title', bookController.deleteBookByTitle); // ✅ DELETE by title

module.exports = router;
