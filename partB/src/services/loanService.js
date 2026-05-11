const { getDb } = require('../db/database');

function getAllLoans(filters = {}) {
  const db = getDb();
  let query = `
    SELECT l.*, b.title as book_title, m.name as member_name
    FROM loans l
    JOIN books b ON l.book_id = b.id
    JOIN members m ON l.member_id = m.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.status) {
    query += ' AND l.status = ?';
    params.push(filters.status);
  }

  query += ' ORDER BY l.created_at DESC';
  return db.prepare(query).all(...params);
}

function getLoanById(id) {
  const db = getDb();
  return db.prepare(`
    SELECT l.*, b.title as book_title, m.name as member_name
    FROM loans l
    JOIN books b ON l.book_id = b.id
    JOIN members m ON l.member_id = m.id
    WHERE l.id = ?
  `).get(id);
}

function getOverdueLoans() {
  const db = getDb();
  return db.prepare(`
    SELECT l.*, b.title as book_title, m.name as member_name
    FROM loans l
    JOIN books b ON l.book_id = b.id
    JOIN members m ON l.member_id = m.id
    WHERE l.status = 'active' AND l.due_date < date('now')
    ORDER BY l.due_date ASC
  `).all();
}

function createLoan(data) {
  const db = getDb();

  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(data.book_id);
  if (!book) throw Object.assign(new Error('Book not found'), { status: 404 });
  if (!book.available) throw Object.assign(new Error('Book is not available'), { status: 409 });

  const member = db.prepare('SELECT * FROM members WHERE id = ?').get(data.member_id);
  if (!member) throw Object.assign(new Error('Member not found'), { status: 404 });
  if (!member.active) throw Object.assign(new Error('Member is not active'), { status: 409 });

  const createLoanAndUpdateBook = db.transaction(() => {
    const result = db.prepare(
      'INSERT INTO loans (book_id, member_id, due_date) VALUES (?, ?, ?)'
    ).run(data.book_id, data.member_id, data.due_date);

    db.prepare('UPDATE books SET available = 0 WHERE id = ?').run(data.book_id);
    return getLoanById(result.lastInsertRowid);
  });

  return createLoanAndUpdateBook();
}

function returnLoan(id) {
  const db = getDb();
  const loan = getLoanById(id);
  if (!loan) throw Object.assign(new Error('Loan not found'), { status: 404 });
  if (loan.status === 'returned') throw Object.assign(new Error('Already returned'), { status: 409 });

  const returnLoanAndUpdateBook = db.transaction(() => {
    db.prepare(
      "UPDATE loans SET status='returned', return_date=date('now') WHERE id=?"
    ).run(id);
    db.prepare('UPDATE books SET available = 1 WHERE id = ?').run(loan.book_id);
    return getLoanById(id);
  });

  return returnLoanAndUpdateBook();
}

module.exports = { getAllLoans, getLoanById, getOverdueLoans, createLoan, returnLoan };
