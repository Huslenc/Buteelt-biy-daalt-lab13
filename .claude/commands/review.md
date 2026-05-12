# /review — Security & Robustness Review

Review the following code for security vulnerabilities and robustness issues.

## Check for:

### Security (OWASP Top 10)
- SQL Injection: Are all queries using parameterized statements?
- Input validation: Is user input sanitized before use?
- Error messages: Do they leak internal implementation details?
- Dependencies: Any known vulnerable packages?

### Robustness
- Are all edge cases handled? (empty input, null, undefined)
- Are async errors caught with try/catch?
- Are HTTP status codes correct? (400, 404, 409, 500)
- Is the error handler middleware used correctly?

### Code Quality
- Are there any hardcoded values that should be constants?
- Is there repeated logic that should be extracted?

## Output format:
1. List each issue found with severity: [HIGH / MEDIUM / LOW]
2. Show the problematic code snippet
3. Suggest the fix

Code to review:
$ARGUMENTS
