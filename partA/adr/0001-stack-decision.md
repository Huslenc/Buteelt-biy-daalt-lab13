# ADR-001: Stack сонголт — Node.js + Express + SQLite

## Status
Accepted

## Date
2025-05-09

## Context
Mini Library System-д зориулсан backend + database stack сонгох шаардлага гарлаа.
3 хувилбарыг AI-тай хамтран харьцуулсан (дэлгэрэнгүй: `STACK-COMPARISON.md`):
- Stack A: Node.js + Express + SQLite
- Stack B: Python + FastAPI + PostgreSQL
- Stack C: Bun + Hono + SQLite

Шалгуур:
1. AI tool (Claude Code) -ийн дэмжлэг
2. SQLite-тэй нийцэл (deploy хялбар)
3. Test бичих хялбар байдал
4. Бие даалт 11-ийн суурийг ашиглах боломж

## Decision
**Stack A: Node.js 20 + Express 4 + SQLite (better-sqlite3)** сонгоно.

Frontend-д React 18 + Vite нэмнэ.
Test-д Jest + Supertest ашиглана.

## Consequences

### Эерэг
- Claude Code JS/TS ecosystem-д хамгийн сайн ажилладаг → AI workflow бүрэн ашиглана
- `better-sqlite3` sync API → async алдаа багасна
- Нэг `library.sqlite` файл → deploy хялбар, environment нэмэлтгүй
- Jest + Supertest → ≥10 тест хурдан бичнэ

### Сөрөг
- Validation гараар бичих хэрэгтэй (FastAPI шиг автомат биш)
- PostgreSQL-ийн хүч чадал байхгүй (гэхдээ жижиг проектод хэрэггүй)

## Alternatives Considered
- **FastAPI**: OpenAPI автомат боловч PostgreSQL setup нэмэлт хугацаа, overkill
- **Bun + Hono**: Хурдан боловч AI suggestion бага, ecosystem залуу

## Notes
AI-тай хийсэн харьцуулалтын товч: `ai-sessions/plan.md`
