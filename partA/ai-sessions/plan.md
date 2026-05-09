# AI Planning Session Log — Өдөр 1

**Огноо:** 2025-05-09  
**Хэрэгсэл:** Claude (claude.ai)  
**Зорилго:** Stack сонголт, архитектур, директор бүтэц тогтоох

---

## Session 1: Stack харьцуулалт

**Би:** Mini library system хийхэд ямар stack тохиромжтой вэ? Node+Express+SQLite, Python+FastAPI+PostgreSQL, Bun+Hono+SQLite гэсэн 3-г харьцуул.

**Claude (товч):**
- Node+Express+SQLite: AI tool дэмжлэг хамгийн өндөр, better-sqlite3 sync API-тай тул async complexity байхгүй. Jest/Supertest тест хялбар.
- FastAPI: OpenAPI автомат давуу, гэхдээ PostgreSQL setup нэмэлт цаг, жижиг проектод overkill.
- Bun+Hono: Хурдан боловч ecosystem залуу, Claude Code заримдаа Node API санал болгоод алдаа гардаг.

**Шийдвэр:** Node+Express+SQLite → ADR-001 болгов.

---

## Session 2: Архитектур диаграм

**Би:** Mini library-д ямар layer бүтэц тохиромжтой вэ? Router→Controller→Service→DB pattern ашиглах уу?

**Claude (товч):**
- 3-layer architecture (Router/Controller/Service) жижиг проектод сайн — test isolation хялбар болно.
- Service layer-д business rule (ном available эсэх шалгалт гэх мэт) байрлуулна.
- Mermaid-аар graph болон sequence диаграм зурахыг санал болгов.

**Хэрэглэсэн зүйл:** Mermaid диаграм template-ийг Claude үүсгэсэн, миний баталгаажуулсан.

---

## Session 3: Database schema

**Би:** BOOKS, MEMBERS, LOANS хүснэгтийн schema-г санал болго. Loan-д ямар field хэрэгтэй вэ?

**Claude (товч):**
- LOANS-д `loan_date`, `due_date`, `return_date`, `status` field хэрэгтэй.
- `return_date NULL` → буцаагаагүй гэсэн утга.
- `PRAGMA foreign_keys = ON` заавал идэвхжүүл гэж анхааруулсан.
- `available` field BOOKS-д boolean int (0/1) болгохыг санал болгов.

**Миний нэмсэн зүйл:** `active` field MEMBERS-д — идэвхгүй гишүүнийг устгахын оронд toggle хийх.

---

## Дүгнэлт

| Асуудал | AI хийсэн | Би хийсэн |
|---------|-----------|----------|
| Stack харьцуулалт | Шалгуур жагсаасан | Эцсийн шийдвэр |
| Архитектур | Layer бүтэц санал болгов | Schema баталгаажуулсан |
| DB Schema | Field-ууд санал болгов | `active` field нэмсэн |
| CLAUDE.md | Template санал болгов | No-go zones өөрөө нэмсэн |

**Анхаарал:** Claude `isbn` field-д unique constraint автоматаар санал болгосонгүй — би сүүлд нэмсэн. Энэ жижиг hallucination/omission-ийн жишээ болов.
