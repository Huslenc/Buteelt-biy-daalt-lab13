# Mini Library — Backend API

## Суулгах
```bash
cd partB
npm install
```

## Ажиллуулах
```bash
npm run dev    # http://localhost:3000
```

## Тест
```bash
npm test
```

## API Endpoints

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | /api/v1/books | Бүх ном (search, genre, available filter) |
| GET | /api/v1/books/:id | Нэг ном |
| POST | /api/v1/books | Ном нэмэх |
| PUT | /api/v1/books/:id | Ном засах |
| DELETE | /api/v1/books/:id | Ном устгах |
| GET | /api/v1/members | Бүх гишүүн |
| POST | /api/v1/members | Гишүүн нэмэх |
| POST | /api/v1/loans | Ном зээлэх |
| PUT | /api/v1/loans/:id/return | Ном буцаах |
| GET | /api/v1/loans/overdue | Хугацаа дууссан |
