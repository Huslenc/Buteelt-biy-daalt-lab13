# AI Session 02 — Loan Service Business Logic

**Огноо:** 2025-05-11  
**Хэрэгсэл:** Claude  
**Зорилго:** Loan үүсгэх, буцаах transaction logic

---

## Асуулт
Ном зээлэхэд book.available шалгаж, transaction-аар loan нэмж, book-ийг available=0 болгох service функц бич.

## Claude-ийн хариу (товч)
- `db.transaction()` ашиглан atomic operation хийхийг санал болгов
- Book available эсэхийг эхлээд шалгах pattern санал болгов
- `Object.assign(new Error(...), { status: 404 })` pattern-ийг controller-д дамжуулахад ашиглахыг санал болгов

## Миний өөрчлөлт
- Member `active` эсэхийг шалгах нэмсэн (Claude анхандаа орхисон)
- Return хийхэд `return_date = date('now')` SQLite функц ашиглав

## Security анхаарал
Claude эхний хувилбарт `book_id` болон `member_id`-г шалгахгүйгээр шууд INSERT хийх санал болгосон — SQL injection биш ч business logic алдаа байсан. Би validation нэмсэн.

## Үр дүн
`src/services/loanService.js` — transaction-тай, бүрэн validation-тай
