const request = require('supertest');
const app = require('../src/index');
const { closeDb } = require('../src/db/database');

afterAll(() => closeDb());

describe('Loans API', () => {
  let bookId, memberId, loanId;

  beforeAll(async () => {
    const book = await request(app).post('/api/v1/books').send({
      title: 'Loan Test Book', author: 'Author', isbn: 'LOAN-ISBN-001'
    });
    bookId = book.body.data.id;

    const member = await request(app).post('/api/v1/members').send({
      name: 'Loan Tester', email: 'loantester@example.com'
    });
    memberId = member.body.data.id;
  });

  test('POST /api/v1/loans — creates a loan', async () => {
    const res = await request(app).post('/api/v1/loans').send({
      book_id: bookId,
      member_id: memberId,
      due_date: '2025-06-01'
    });
    expect(res.status).toBe(201);
    expect(res.body.data.book_id).toBe(bookId);
    loanId = res.body.data.id;
  });

  test('GET /api/v1/loans — returns list', async () => {
    const res = await request(app).get('/api/v1/loans');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/loans/:id — returns one loan', async () => {
    const res = await request(app).get(`/api/v1/loans/${loanId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(loanId);
  });

  test('POST /api/v1/loans — 409 if book not available', async () => {
    const res = await request(app).post('/api/v1/loans').send({
      book_id: bookId,
      member_id: memberId,
      due_date: '2025-06-01'
    });
    expect(res.status).toBe(409);
  });

  test('GET /api/v1/loans/overdue — returns overdue list', async () => {
    const res = await request(app).get('/api/v1/loans/overdue');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('PUT /api/v1/loans/:id/return — returns book', async () => {
    const res = await request(app).put(`/api/v1/loans/${loanId}/return`);
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('returned');
  });

  test('PUT /api/v1/loans/:id/return — 409 if already returned', async () => {
    const res = await request(app).put(`/api/v1/loans/${loanId}/return`);
    expect(res.status).toBe(409);
  });

  test('POST /api/v1/loans — 400 if due_date missing', async () => {
    const res = await request(app).post('/api/v1/loans').send({
      book_id: bookId, member_id: memberId
    });
    expect(res.status).toBe(400);
  });
});
