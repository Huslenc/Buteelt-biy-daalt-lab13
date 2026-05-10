const { getDb } = require('../db/database');

function getAllBooks(filters = {}) {
  const db = getDb();
  let query = 'SELECT * FROM books WHERE 1=1';
  const params = [];

  if (filters.search) {
    query += ' AND (title LIKE ? OR author LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }
  if (filters.genre) {
    query += ' AND genre = ?';
    params.push(filters.genre);
  }
  if (filters.available !== undefined) {
    query += ' AND available = ?';
    params.push(filters.available === 'true' ? 1 : 0);
  }

  query += ' ORDER BY created_at DESC';
  return db.prepare(query).all(...params);
}

function getBookById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM books WHERE id = ?').get(id);
}

function createBook(data) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO books (title, author, isbn, genre) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(data.title, data.author, data.isbn, data.genre || null);
  return getBookById(result.lastInsertRowid);
}

function updateBook(id, data) {
  const db = getDb();
  const book = getBookById(id);
  if (!book) return null;

  db.prepare(
    'UPDATE books SET title=?, author=?, isbn=?, genre=? WHERE id=?'
  ).run(data.title || book.title, data.author || book.author,
        data.isbn || book.isbn, data.genre || book.genre, id);

  return getBookById(id);
}

function deleteBook(id) {
  const db = getDb();
  const book = getBookById(id);
  if (!book) return null;
  db.prepare('DELETE FROM books WHERE id = ?').run(id);
  return book;
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
