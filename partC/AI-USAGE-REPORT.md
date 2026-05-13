# AI Usage Report — Mini Library System

**Бие даалт 13 — F.CSM311**  
**Огноо:** 2025-05-13  
**Үг тоо:** ≥1500

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### А хэсэг (Төлөвлөлт)

**AI хийсэн:**
- Stack харьцуулалтын хүснэгтийн template үүсгэсэн (STACK-COMPARISON.md)
- Mermaid диаграмын syntax санал болгосон (ARCHITECTURE.md)
- ADR format-ийн template өгсөн
- CLAUDE.md-ийн бүтэц санал болгосон

**Өөрөө хийсэн:**
- Mini Library сонгох шийдвэр
- Stack-ийн эцсийн сонголт (Node+Express+SQLite)
- Scope тодорхойлох (юу in/out scope байхыг шийдэх)
- `active` field MEMBERS-д нэмэх санаа
- No-go zones CLAUDE.md-д нэмэх

### Б хэсэг (Хэрэгжилт)

**AI хийсэн:**
- `database.js` migration код үүсгэсэн
- Controller/Service/Route файлуудын scaffold
- Jest тестүүдийн үндсэн бүтэц
- Slash command-уудын template

**Өөрөө хийсэн:**
- `db.transaction()` ашиглах шийдвэр (loan atomic operation)
- `available` болон `active` field-ийн logic
- `runInBand` Jest option нэмэх (DB collision засах)
- `closeDb()` afterAll-д нэмэх (memory leak засах)
- AI санал болгосон async better-sqlite3 засах

---

## 2. Hallucination 2+ жишээ

### Жишээ 1: better-sqlite3 async API
AI `better-sqlite3`-д `await db.prepare(...).run()` гэж async хэлбэрээр ашиглахыг санал болгосон. Гэвч `better-sqlite3` нь зориудын synchronous library тул `await` хэрэггүй, ашиглавал алдаа гарна.

**Олж засах:** `better-sqlite3` официал documentation уншаад синхрон хэлбэрт засав:
```javascript
// AI санал болгосон (буруу)
const result = await db.prepare('INSERT ...').run(data);

// Зөв
const result = db.prepare('INSERT ...').run(data);
```

### Жишээ 2: Supertest assertion format
AI тест үүсгэхдээ манай API-ийн response format-ийг буруу таамаглаж `res.body.title` гэж бичсэн. Гэвч манай API `{ data: {}, message: '' }` format ашиглах тул `res.body.data.title` байх ёстой.

**Олж засах:** API response format-ийг өөрөө шалгаад бүх assertion-ийг засав:
```javascript
// AI санал болгосон (буруу)
expect(res.body.title).toBe('The Hobbit');

// Зөв
expect(res.body.data.title).toBe('The Hobbit');
```

---

## 3. Security/License анхаарал

### Security жишээ: Error message leak
AI-ийн анхны `errorHandler.js` хувилбарт `err.stack` -ийг шууд response-д буцаах санал болгосон:
```javascript
// AI санал болгосон (аюултай)
res.status(500).json({ error: err.stack });
```
Production дээр stack trace нь attacker-т internal file path, library version харуулдаг. OWASP A05 (Security Misconfiguration) эрсдэл.

**Засав:**
```javascript
// Зөв — зөвхөн message буцаана
res.status(status).json({ error: err.message || 'Internal Server Error' });
```

### License анхаарал
`better-sqlite3` MIT license, `express` MIT license — ашиглахад саадгүй. AI dependency санал болгохдоо license шалгахгүй тул өөрөө npmjs.com дээр баталгаажуулсан.

---

## 4. Юуг AI-аар хурдан хийсэн?

**Хамгийн хурдан:** Scaffold код үүсгэх. Controller, Service, Route файл бүрийн үндсэн бүтцийг гараар бичвэл 2-3 цаг зарцуулах байсан — AI 5 минутад үүсгэсэн.

**Тест үүсгэх:** Happy path + edge case тестүүдийн жагсаалт гаргах хялбар болсон. AI "ямар edge case байж болох вэ?" гэсэн асуултад сайн хариулдаг.

**Mermaid диаграм:** Syntax санаж байх хэрэггүй болсон — AI-д зөвхөн утгыг тайлбарлаад диаграм гаргуулсан.

**Documentation:** CLAUDE.md, ADR, README-ийн бүтэц AI template-ийн дагуу хурдан бичигдсэн.

---

## 5. Юуг AI-аар удаан хийсэн?

**Business logic шалгалт:** Loan үүсгэхдээ book available эсэх, member active эсэхийг шалгах logic-ийг AI анхандаа орхисон. Гараар нэмэх шаардлагатай болсон — AI-ийн санал болгосон кодыг бүрэн итгэж авч болохгүйг харуулсан.

**Context алдагдах:** Урт session-д AI өмнөх шийдвэрийг "мартдаг". Жишээ нь CLAUDE.md-д `{ data: {}, message: '' }` format тодорхойлсон ч дараагийн session-д AI өөр format санал болгосон. Тайлбарлаж залруулах цаг зарцуулсан.

**Антипаттерн — шууд итгэх:** Эхний үед AI code-ийг шууд хэрэглэсэн. `closeDb()` орхигдсон нь тест дууссаны дараа memory leak үүсгэсэн — debug хийхэд цаг орсон.

---

## 6. Skill atrophy эрсдэлийг яаж зохицуулсан?

**"AI байхгүй" цаг гаргасан:** Loan service-ийн transaction logic-ийг AI тусламжгүйгээр өөрөө бичсэн. `db.transaction()` API-г documentation-аас уншиж ойлгосон.

**Code review хийсэн:** AI үүсгэсэн бүх файлыг мөр мөрөөр уншиж, юу хийж байгааг ойлгосон. Ойлгоогүй мөрийг асуусан эсвэл өөрөө documentation уншсан.

**Тестийг өөрөө шалгасан:** `npm test` ажиллуулаад бүх тест дааж байгааг баталгаажуулсан. AI тест бичсэн ч алдаатай байвал өөрөө засах чадвар хэрэгтэй гэдгийг мэдэрсэн.

**Дүгнэлт:** AI нь "хурдан бичих" хэрэгсэл биш — "шалгаж, баталгаажуулж, ойлгоод ашиглах" хэрэгсэл гэдгийг энэ бие даалтаас сурсан.

---
