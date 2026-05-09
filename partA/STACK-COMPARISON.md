# Stack Comparison — Mini Library System

AI-тай хамтран 3 stack-ийг харьцуулж нэгийг сонгосон.
Chat history товчлол: `ai-sessions/plan.md`

## Харьцуулсан 3 Stack

| Шалгуур | **Stack A** Node + Express + SQLite | **Stack B** Python + FastAPI + PostgreSQL | **Stack C** Bun + Hono + SQLite |
|---------|------|------|------|
| Setup хялбар | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| AI tool дэмжлэг | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| SQLite нийцэл | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| OpenAPI үүсгэлт | swagger-autogen | автомат | hono/zod |
| Test ecosystem | Jest, Supertest | pytest | Bun test |
| Deploy хялбар | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Сурах хугацаа | Бага | Дунд | Дунд |

---

## Stack A: Node.js + Express + SQLite ✅ Сонгосон

**Давуу тал:**
- Claude Code болон GitHub Copilot хамгийн сайн дэмждэг
- `better-sqlite3` синхрон API — async complexity байхгүй
- Jest + Supertest test бичихэд хялбар
- Нэг JS хэлээр frontend + backend

**Сул тал:**
- FastAPI шиг автомат validation байхгүй — гараар нэмэх хэрэгтэй
- Type safety хязгаарлагдмал (TypeScript нэмж болно)

---

## Stack B: Python + FastAPI + PostgreSQL

**Давуу тал:**
- OpenAPI автоматаар үүснэ (swagger-ui built-in)
- Pydantic-аар хүчтэй type validation
- PostgreSQL production-д хүчирхэг

**Сул тал:**
- PostgreSQL суулгах нэмэлт цаг
- Жижиг проектод хэтэрхий хүчтэй (overkill)
- Frontend-тэй холбоход CORS тохируулалт нэмэгдэнэ

---

## Stack C: Bun + Hono + SQLite

**Давуу тал:**
- Хамгийн хурдан runtime (Bun)
- TypeScript-native

**Сул тал:**
- Ecosystem залуу — AI suggestion бага, жишээ хангалтгүй
- Claude Code заримдаа Node API санал болгодог → алдаа гардаг
- Community жижиг

---

## Дүгнэлт

**Stack A** сонгосон шалтгаан:
1. AI workflow-д хамгийн тохиромжтой — Claude Code JS/TS-г хамгийн сайн мэднэ
2. SQLite + better-sqlite3 → deploy хялбар, файл нэг л байна
3. Jest/Supertest → ≥10 тест бичихэд хурдан
4. Бие даалт 11-ийн SQLite суурь дахин ашиглах боломжтой
