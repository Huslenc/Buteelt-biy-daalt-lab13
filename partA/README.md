# Mini Library System — README 

## Тухай
Номын сан удирдлагын жижиг систем. Ном бүртгэл, гишүүн удирдлага, зээлэлт хянах.

## Шаардлага
- Node.js 20+
- npm 10+

## Суулгах

```bash
git clone https://github.com/<username>/bie-daalt-13.git
cd bie-daalt-13/partB
npm install
```

## Ажиллуулах

```bash
npm run dev        # http://localhost:3000
```

## Тест

```bash
npm test
npm run test:coverage
```

## API Endpoints (товч)

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | /api/v1/books | Бүх ном |
| POST | /api/v1/books | Ном нэмэх |
| PUT | /api/v1/books/:id | Ном засах |
| DELETE | /api/v1/books/:id | Ном устгах |
| GET | /api/v1/members | Бүх гишүүн |
| POST | /api/v1/loans | Ном зээлэх |
| PUT | /api/v1/loans/:id/return | Буцаах |
| GET | /api/v1/loans/overdue | Хугацаа дууссан |

## Дэлгэрэнгүй
`partB/README.md` — бүрэн документ
`partA/ARCHITECTURE.md` — архитектур диаграм
