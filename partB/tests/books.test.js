const request = require('supertest');
const app = require('../src/index');
const { closeDb } = require('../src/db/database');

afterAll(() => closeDb());

describe('Books API', () => {
  let createdId;

  // Happy path
  test('POST /api/v1/books — creates a book', async () => {
    const res = await request(app).post('/api/v1/books').send({
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '978-0-261-10221-7',
      genre: 'Fantasy'
    });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('The Hobbit');
    createdId = res.body.data.id;
  });

  test('GET /api/v1/books — returns list', async () => {
    const res = await request(app).get('/api/v1/books');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/v1/books/:id — returns one book', async () => {
    const res = await request(app).get(`/api/v1/books/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });

  test('PUT /api/v1/books/:id — updates a book', async () => {
    const res = await request(app).put(`/api/v1/books/${createdId}`).send({
      title: 'The Hobbit (Updated)'
    });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('The Hobbit (Updated)');
  });

  test('GET /api/v1/books?search=Tolkien — search works', async () => {
    const res = await request(app).get('/api/v1/books?search=Tolkien');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('DELETE /api/v1/books/:id — deletes a book', async () => {
    const res = await request(app).delete(`/api/v1/books/${createdId}`);
    expect(res.status).toBe(204);
  });

  // Edge cases
  test('GET /api/v1/books/:id — 404 if not found', async () => {
    const res = await request(app).get('/api/v1/books/99999');
    expect(res.status).toBe(404);
  });

  test('POST /api/v1/books — 400 if title missing', async () => {
    const res = await request(app).post('/api/v1/books').send({
      author: 'Someone',
      isbn: '123-456'
    });
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/books — 400 if isbn too short', async () => {
    const res = await request(app).post('/api/v1/books').send({
      title: 'Test', author: 'Test', isbn: 'ab'
    });
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/books — 409 if duplicate isbn', async () => {
    await request(app).post('/api/v1/books').send({
      title: 'Book A', author: 'Author A', isbn: 'UNIQUE-ISBN-001'
    });
    const res = await request(app).post('/api/v1/books').send({
      title: 'Book B', author: 'Author B', isbn: 'UNIQUE-ISBN-001'
    });
    expect(res.status).toBe(409);
  });
});
