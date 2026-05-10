const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook } = require('../middleware/validate');

router.get('/',    bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/',   validateBook, bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
