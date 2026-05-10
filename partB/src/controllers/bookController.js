const bookService = require('../services/bookService');

function getBooks(req, res, next) {
  try {
    const books = bookService.getAllBooks(req.query);
    res.json({ data: books, message: 'success' });
  } catch (err) { next(err); }
}

function getBook(req, res, next) {
  try {
    const book = bookService.getBookById(Number(req.params.id));
    if (!book) return res.status(404).json({ error: 'Book not found', code: 404 });
    res.json({ data: book, message: 'success' });
  } catch (err) { next(err); }
}

function createBook(req, res, next) {
  try {
    const book = bookService.createBook(req.body);
    res.status(201).json({ data: book, message: 'Book created' });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'ISBN already exists', code: 409 });
    }
    next(err);
  }
}

function updateBook(req, res, next) {
  try {
    const book = bookService.updateBook(Number(req.params.id), req.body);
    if (!book) return res.status(404).json({ error: 'Book not found', code: 404 });
    res.json({ data: book, message: 'Book updated' });
  } catch (err) { next(err); }
}

function deleteBook(req, res, next) {
  try {
    const book = bookService.deleteBook(Number(req.params.id));
    if (!book) return res.status(404).json({ error: 'Book not found', code: 404 });
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
