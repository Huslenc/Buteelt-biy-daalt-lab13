const { getDb } = require('../db/database');

function getAllMembers(filters = {}) {
  const db = getDb();
  let query = 'SELECT * FROM members WHERE 1=1';
  const params = [];

  if (filters.search) {
    query += ' AND (name LIKE ? OR email LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }
  if (filters.active !== undefined) {
    query += ' AND active = ?';
    params.push(filters.active === 'true' ? 1 : 0);
  }

  query += ' ORDER BY created_at DESC';
  return db.prepare(query).all(...params);
}

function getMemberById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM members WHERE id = ?').get(id);
}

function createMember(data) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO members (name, email, phone) VALUES (?, ?, ?)'
  );
  const result = stmt.run(data.name, data.email, data.phone || null);
  return getMemberById(result.lastInsertRowid);
}

function updateMember(id, data) {
  const db = getDb();
  const member = getMemberById(id);
  if (!member) return null;

  db.prepare(
    'UPDATE members SET name=?, email=?, phone=?, active=? WHERE id=?'
  ).run(
    data.name  || member.name,
    data.email || member.email,
    data.phone || member.phone,
    data.active !== undefined ? (data.active ? 1 : 0) : member.active,
    id
  );
  return getMemberById(id);
}

function deleteMember(id) {
  const db = getDb();
  const member = getMemberById(id);
  if (!member) return null;
  db.prepare('DELETE FROM members WHERE id = ?').run(id);
  return member;
}

module.exports = { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
