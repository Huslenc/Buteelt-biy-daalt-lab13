# AI Session 01 — Database Schema Design

**Огноо:** 2025-05-10  
**Хэрэгсэл:** Claude  
**Зорилго:** SQLite schema болон migration код үүсгэх

---

## Асуулт
BOOKS, MEMBERS, LOANS хүснэгтийн schema-г Node.js better-sqlite3-д зориулан үүсгэж өг. Foreign key, migration функц хэрэгтэй.

## Claude-ийн хариу (товч)
- `CREATE TABLE IF NOT EXISTS` ашиглан migration бичив
- `PRAGMA foreign_keys = ON` заавал нэмэх ёстойг анхааруулсан
- `WAL mode` performance-д сайн гэж санал болгов
- Test-д `:memory:` database ашиглахыг санал болгов

## Миний өөрчлөлт
- `available` field BOOKS-д нэмсэн (Claude санал болгоогүй)
- `active` field MEMBERS-д нэмсэн
- `NODE_ENV === 'test'` шалгалт нэмсэн

## Hallucination жишээ
Claude `better-sqlite3`-д async `.run()` ашиглахыг санал болгосон — гэхдээ `better-sqlite3` нь synchronous library тул async байхгүй. Баталгаажуулаад синхрон хэлбэрт засав.

## Үр дүн
`src/db/database.js` — ажиллаж байгаа
