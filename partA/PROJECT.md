# Mini Library System — Project Overview

## Сонгосон сэдэв
**Option 4: Mini Library

## Зорилго
Жижиг номын санд зориулсан удирдлагын систем. Ном бүртгэх, гишүүн бүртгэх, зээлэлт хянах үндсэн функцуудтай REST API + React frontend.

## Scope

### In Scope 
- **Book Inventory** — ном нэмэх, засах, устгах, хайх (title, author, ISBN, genre)
- **Member Management** — гишүүн бүртгэл, CRUD, хайлт
- **Loan Tracking** — ном зээлэх, буцаах, хугацаа дууссан хянах
- **Search & Filter** — ном болон гишүүнийг нэрэар, жанраар шүүх
- **REST API** — Express.js, OpenAPI 3.0 spec
- **Minimal Frontend** — React 18

### Out of Scope 
- Authentication / login system
- Email / SMS notification
- Fine calculation (торгууль)
- Multiple library branches
- Barcode scanning

## Гол Feature-үүд (5)
1. **Book CRUD** — бүтэн бүртгэл, ISBN validation
2. **Member CRUD** — гишүүн бүртгэл, идэвхтэй/идэвхгүй статус
3. **Loan Management** — зээлэх, буцаах, хугацаа шалгах
4. **Search & Filter** — title, author, genre, status-аар
5. **Overdue Detection** — хугацаа дууссан зээлийн мэдэгдэл

## Технологи
- Node.js 20 + Express 4
- SQLite (better-sqlite3)
- React 18 + Vite
- Jest + Supertest
