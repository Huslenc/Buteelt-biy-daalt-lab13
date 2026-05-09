# CLAUDE.md — Mini Library System

AI assistant-д зориулсан project context. Энэ файлыг уншсаны дараа кодлоорой.

## Project Overview
Mini Library System — номын сан удирдлага.
- Book inventory (ном бүртгэл)
- Member management (гишүүн удирдлага)
- Loan tracking (зээлэлт хянах)

## Stack
- **Runtime**: Node.js 20+
- **Framework**: Express 4
- **Database**: SQLite via `better-sqlite3`
- **Frontend**: React 18 + Vite
- **Test**: Jest + Supertest
- **Lint**: ESLint (eslint:recommended)

## Build Commands
```bash
# Backend
cd partB && npm install
npm run dev          # nodemon src/index.js (port 3000)
npm test             # jest --coverage
npm run lint         # eslint src/

# Frontend
cd partB/client && npm install
npm run dev          # vite (port 5173)
npm run build        # vite build
```

## Project Structure
```
partB/
  src/
    index.js          # Express app entry
    routes/           # books.js, members.js, loans.js
    controllers/      # bookController.js, memberController.js, loanController.js
    services/         # business logic
    db/               # database.js (schema + connection)
    middleware/        # validate.js, errorHandler.js
  client/
    src/
      components/     # React components
      hooks/          # useFetch, useBooks, etc.
  tests/              # *.test.js files
```

## Conventions
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`)
- **AI commits**: `Co-Authored-By: Claude <noreply@anthropic.com>` commit body-д нэм
- **Naming**: camelCase (JS), kebab-case (files), UPPER_CASE (constants)
- **Error handling**: try/catch бүх async function-д, `next(err)` middleware руу дамжуул
- **Validation**: Input-ийг controller дээр шалгаж, service-д цэвэр data явуул
- **HTTP status**: 200 GET, 201 POST, 204 DELETE, 400 validation, 404 not found, 500 server

## No-Go Zones 🚫
- `eval()` болон `Function()` constructor ашиглахгүй
- Raw SQL string concatenation (SQL injection) — параметр bind ашиглах
- `console.log` production кодод — logger module ашиглах
- `*` import (import бүхнийг нэрлэж авах)
- Synchronous file I/O except better-sqlite3 (зориудын sync)
- Hard-coded credentials — `.env` файл ашиглах
- `node_modules/` commit хийхгүй

## Database Rules
- Migration: `src/db/database.js`-д `CREATE TABLE IF NOT EXISTS`
- Foreign keys: `PRAGMA foreign_keys = ON` заавал идэвхжүүл
- Параметр: `db.prepare('SELECT * FROM books WHERE id = ?').get(id)`

## Testing Rules
- Тест файл нэр: `*.test.js`
- Нэг describe block — нэг resource (books, members, loans)
- Happy path + edge case (empty input, not found, duplicate) хоёулыг бич
- Mock хийхгүй — in-memory SQLite ашигла

## API Conventions
- Base path: `/api/v1/`
- Response format:
```json
{ "data": {}, "message": "success" }
{ "error": "Not found", "code": 404 }
```
