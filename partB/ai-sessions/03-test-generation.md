# AI Session 03 — Test Generation

**Огноо:** 2025-05-11  
**Хэрэгсэл:** Claude  
**Зорилго:** Jest + Supertest тестүүд үүсгэх

---

## Асуулт
Books, Members, Loans API-д зориулсан Jest + Supertest тест бич. Happy path + edge case хоёулыг хамруул.

## Claude-ийн хариу (товч)
- `beforeAll` / `afterAll` pattern зөв ашигласан
- In-memory SQLite тестэд `NODE_ENV=test` ашиглахыг санал болгов
- Duplicate ISBN → 409, email validation → 400 тестүүд санал болгов

## Миний өөрчлөлт
- `afterAll(() => closeDb())` — Claude орхисон, би нэмсэн (memory leak)
- Loans тестэд `beforeAll`-д book + member үүсгэх хэрэгтэйг Claude мартсан — би нэмсэн
- `runInBand` option `package.json`-д нэмсэн (DB collision зайлсхийхийн тулд)

## Hallucination жишээ
Claude `supertest`-ийн `.expect(201)` дараа `.body.data` биш `.body` шууд ашиглахыг санал болгосон — манай API `{ data: {}, message: '' }` format ашигладаг тул алдаатай байсан. Бүх assertion-ийг `.body.data` болгов.

## Үр дүн
`tests/books.test.js`, `tests/members.test.js`, `tests/loans.test.js` — нийт 28 тест
