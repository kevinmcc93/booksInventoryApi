const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController');

router.get('/', booksController.getBooks);
router.get('/:_id', booksController.getBookById);
router.post('/', booksController.addBook);
router.patch('/:_id', booksController.updateBook);
router.delete('/:_id', booksController.deleteBook);

module.exports = router;