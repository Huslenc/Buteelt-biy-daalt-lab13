# /test — Generate Tests

Generate comprehensive Jest + Supertest tests for the following code.

## Testing Pyramid Coverage:

### Happy Path
- Successful creation (POST → 201)
- Successful retrieval (GET → 200)
- Successful update (PUT → 200)
- Successful deletion (DELETE → 204)

### Edge Cases
- Missing required fields → 400
- Invalid format (email, isbn) → 400
- Resource not found → 404
- Duplicate unique field → 409
- Empty list response → 200 with empty array

### Business Logic
- Loan: book not available → 409
- Loan: already returned → 409
- Search/filter returns correct results

## Rules:
- Use `beforeAll` to seed test data
- Use `afterAll` to call `closeDb()`
- Use in-memory SQLite (NODE_ENV=test)
- Each test must be independent

Generate tests for:
$ARGUMENTS
