const request = require('supertest');
const app = require('../src/index');
const { closeDb } = require('../src/db/database');

afterAll(() => closeDb());

describe('Members API', () => {
  let createdId;

  test('POST /api/v1/members — creates a member', async () => {
    const res = await request(app).post('/api/v1/members').send({
      name: 'Bat-Erdene',
      email: 'bat@example.com',
      phone: '99001122'
    });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Bat-Erdene');
    createdId = res.body.data.id;
  });

  test('GET /api/v1/members — returns list', async () => {
    const res = await request(app).get('/api/v1/members');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/members/:id — returns one member', async () => {
    const res = await request(app).get(`/api/v1/members/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });

  test('PUT /api/v1/members/:id — updates member', async () => {
    const res = await request(app).put(`/api/v1/members/${createdId}`).send({
      name: 'Bat-Erdene Updated'
    });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Bat-Erdene Updated');
  });

  test('GET /api/v1/members?search=Bat — search works', async () => {
    const res = await request(app).get('/api/v1/members?search=Bat');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('POST /api/v1/members — 400 if email missing', async () => {
    const res = await request(app).post('/api/v1/members').send({ name: 'Test' });
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/members — 400 if invalid email', async () => {
    const res = await request(app).post('/api/v1/members').send({
      name: 'Test', email: 'not-an-email'
    });
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/members — 409 if duplicate email', async () => {
    await request(app).post('/api/v1/members').send({
      name: 'User A', email: 'duplicate@example.com'
    });
    const res = await request(app).post('/api/v1/members').send({
      name: 'User B', email: 'duplicate@example.com'
    });
    expect(res.status).toBe(409);
  });

  test('GET /api/v1/members/:id — 404 if not found', async () => {
    const res = await request(app).get('/api/v1/members/99999');
    expect(res.status).toBe(404);
  });

  test('DELETE /api/v1/members/:id — deletes member', async () => {
    const res = await request(app).delete(`/api/v1/members/${createdId}`);
    expect(res.status).toBe(204);
  });
});
