# /security — OWASP Top 10 Security Audit

Perform a security audit based on OWASP Top 10 for the following code.

## Checklist:

| # | Risk | Check |
|---|------|-------|
| A01 | Broken Access Control | Are routes protected? |
| A02 | Cryptographic Failures | Any sensitive data stored plain? |
| A03 | Injection | SQL parameterized? No eval()? |
| A04 | Insecure Design | Business logic flaws? |
| A05 | Security Misconfiguration | CORS too open? Error details exposed? |
| A06 | Vulnerable Components | Check package.json dependencies |
| A07 | Auth Failures | N/A for this project |
| A08 | Data Integrity Failures | Input validated before DB insert? |
| A09 | Logging Failures | Errors logged? Sensitive data in logs? |
| A10 | SSRF | Any external URL fetching? |

## Output:
For each finding:
- **Risk level**: Critical / High / Medium / Low
- **Location**: file + line
- **Issue**: what is wrong
- **Fix**: concrete code fix

Audit this code:
$ARGUMENTS
