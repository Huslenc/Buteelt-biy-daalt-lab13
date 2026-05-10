function validateBook(req, res, next) {
  const { title, author, isbn } = req.body;
  if (!title || !author || !isbn) {
    return res.status(400).json({
      error: 'title, author, isbn fields are required',
      code: 400
    });
  }
  if (typeof isbn !== 'string' || isbn.trim().length < 5) {
    return res.status(400).json({ error: 'isbn must be at least 5 characters', code: 400 });
  }
  next();
}

function validateMember(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required', code: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format', code: 400 });
  }
  next();
}

function validateLoan(req, res, next) {
  const { book_id, member_id, due_date } = req.body;
  if (!book_id || !member_id || !due_date) {
    return res.status(400).json({ error: 'book_id, member_id, due_date are required', code: 400 });
  }
  next();
}

module.exports = { validateBook, validateMember, validateLoan };
