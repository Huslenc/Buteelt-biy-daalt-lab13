# ADR-002: Loan операцид db.transaction() ашиглах шийдвэр

## Status
Accepted

## Date
2025-05-11

## Context
Ном зээлэх үед 2 тусдаа SQL операц хийгддэг:
1. `INSERT INTO loans ...`
2. `UPDATE books SET available = 0 ...`

Хэрэв эхний операц амжилттай болоод хоёр дахь нь алдаатай болвол:
- Loan бүртгэгдсэн байна
- Гэхдээ ном available=1 хэвээр байна
- Систем inconsistent төлөвт орно

AI-тай ярилцахдаа 2 хувилбар авч үзсэн:
1. Тусдаа `.run()` дараалан дуудах
2. `db.transaction()` ашиглан atomic болгох

## Decision
`db.transaction()` ашиглан loan үүсгэх болон book update-ийг нэг atomic операцид нэгтгэнэ.

```javascript
const createLoanAndUpdateBook = db.transaction(() => {
  const result = db.prepare('INSERT INTO loans ...').run(...);
  db.prepare('UPDATE books SET available = 0 WHERE id = ?').run(bookId);
  return getLoanById(result.lastInsertRowid);
});
return createLoanAndUpdateBook();
```

## Consequences

### Эерэг
- Data consistency баталгаатай — хоёр операц хоёулаа амжилттай болох эсвэл хоёулаа rollback
- better-sqlite3 transaction synchronous тул overhead багатай
- Код уншихад тодорхой — нэг функц = нэг бизнес операц

### Сөрөг
- Transaction дотор өөр transaction дуудаж болохгүй (nested transaction хязгаарлагдмал)
- Test-д тусгай анхаарал шаардана

## AI-тай ярилцлага
AI эхлээд тусдаа `.run()` дуудах санал болгосон. "Хэрэв хоёр дахь query амжилтгүй болвол яах вэ?" гэж асуухад transaction хэрэгтэйг зөвшөөрч `db.transaction()` pattern санал болгосон. Энэ зөв шийдвэр байсан.
