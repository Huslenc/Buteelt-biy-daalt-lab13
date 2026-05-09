# Architecture — Mini Library System

## System Architecture

```mermaid
graph TB
    subgraph Client["Frontend (React 18 + Vite)"]
        UI[Pages & Components]
        Hooks[Custom Hooks]
    end

    subgraph API["Backend (Node.js + Express)"]
        Router[Express Router]
        Controller[Controllers]
        Service[Services]
        Middleware[Validate + ErrorHandler]
    end

    subgraph Data["Data Layer"]
        ORM[better-sqlite3]
        DB[(library.sqlite)]
    end

    UI --> Hooks
    Hooks -->|HTTP /api/v1/| Router
    Router --> Middleware
    Middleware --> Controller
    Controller --> Service
    Service --> ORM
    ORM --> DB
```

## Module Layer Description

| Layer | Файл/Хавтас | Үүрэг |
|-------|-------------|-------|
| Frontend | `client/src/` | UI render, хэрэглэгч interaction |
| Router | `src/routes/` | URL → controller холбоо |
| Controller | `src/controllers/` | req/res format, status code |
| Service | `src/services/` | Business logic, rule шалгалт |
| Middleware | `src/middleware/` | Validation, error handling |
| DB | `src/db/database.js` | Schema, connection, migration |

## Loan Flow Sequence

```mermaid
sequenceDiagram
    participant U as Librarian
    participant R as React UI
    participant A as Express API
    participant S as LoanService
    participant D as SQLite

    U->>R: "Ном зээлэх" товч
    R->>A: POST /api/v1/loans
    A->>S: createLoan(bookId, memberId)
    S->>D: SELECT book WHERE id=? (available шалгах)
    D-->>S: book row
    S->>D: INSERT INTO loans ...
    S->>D: UPDATE books SET available=0
    D-->>S: ok
    S-->>A: loan object
    A-->>R: 201 { data: loan }
    R-->>U: UI шинэчлэгдэнэ
```

## Database Schema

```mermaid
erDiagram
    BOOKS {
        int id PK
        string title
        string author
        string isbn
        string genre
        int available
        datetime created_at
    }
    MEMBERS {
        int id PK
        string name
        string email
        string phone
        int active
        datetime created_at
    }
    LOANS {
        int id PK
        int book_id FK
        int member_id FK
        date loan_date
        date due_date
        date return_date
        string status
    }

    BOOKS ||--o{ LOANS : "зээлэгддэг"
    MEMBERS ||--o{ LOANS : "зээлдэг"
```

## Directory Structure

```
bie-daalt-13/
├── CLAUDE.md
├── README.md
├── .gitignore
├── .claude/commands/
│   ├── review.md
│   ├── test.md
│   ├── docs.md
│   ├── commit.md
│   └── security.md
├── partA/
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── STACK-COMPARISON.md
│   ├── README.md
│   ├── adr/0001-stack-decision.md
│   └── ai-sessions/plan.md
├── partB/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── books.js
│   │   │   ├── members.js
│   │   │   └── loans.js
│   │   ├── controllers/
│   │   │   ├── bookController.js
│   │   │   ├── memberController.js
│   │   │   └── loanController.js
│   │   ├── services/
│   │   │   ├── bookService.js
│   │   │   ├── memberService.js
│   │   │   └── loanService.js
│   │   ├── db/database.js
│   │   └── middleware/
│   │       ├── validate.js
│   │       └── errorHandler.js
│   ├── client/src/
│   ├── tests/
│   ├── openapi.yaml
│   └── README.md
└── partC/
    ├── AI-USAGE-REPORT.md
    ├── SELF-EVALUATION.md
    └── adr/0002-*.md
```
