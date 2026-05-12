# /commit — Generate Commit Message

Generate a Conventional Commits formatted commit message for the following changes.

## Format:
```
<type>(<scope>): <short description>

<body — what and why, not how>

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Types:
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `test` — adding or updating tests
- `refactor` — code change, no feature/fix
- `chore` — build process, dependencies

## Rules:
- Subject line max 72 characters
- Use imperative mood ("add" not "added")
- Body explains WHY not WHAT
- Always add Co-Authored-By line

Generate commit message for these changes:
$ARGUMENTS
