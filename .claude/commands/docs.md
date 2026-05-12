# /docs — Generate Documentation

Generate JSDoc comments and README section for the following code.

## JSDoc format:
```javascript
/**
 * @description Brief description
 * @param {type} name - description
 * @returns {type} description
 * @throws {Error} when condition
 */
```

## README section format:
```markdown
## Function/Endpoint Name
**Description**: what it does
**Parameters**: list with types
**Returns**: what it returns
**Example**: code example
```

## Rules:
- Document all public functions
- Include example request/response for API endpoints
- Note any side effects (DB writes, state changes)

Generate docs for:
$ARGUMENTS
