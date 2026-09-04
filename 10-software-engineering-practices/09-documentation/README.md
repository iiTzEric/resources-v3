# Documentation

**Module:** Software Engineering Practices
**Prerequisites:** [`08-code-reviews`](../08-code-reviews)

## What is it?

Documentation communicates information about a codebase that the code itself doesn't fully convey
— why a decision was made, how to set up and run a project, or what an API's contract is. This
includes code comments, README files, and API documentation.

## Why does it matter?

Well-written code (from the Clean Code topic) reduces the *need* for documentation, but doesn't
eliminate it entirely — some information (the *why* behind a decision, setup instructions) genuinely
can't be expressed through code alone.

## How does it work?

### Comments — explaining *why*, not *what*

```javascript
// BAD - restates what the code already clearly says
// increment count by 1
count++;

// GOOD - explains non-obvious reasoning the code alone doesn't convey
// Retry up to 3 times because the payment provider's API has intermittent
// timeouts under load; confirmed with their support team this is expected.
for (let attempt = 0; attempt < 3; attempt++) { /* ... */ }
```

If code is genuinely clear (following the Clean Code topic's naming/structure guidance), comments
restating *what* it does are redundant noise. Comments earn their place explaining *why* — a
non-obvious business reason, a workaround for an external system's quirk, a deliberate tradeoff a
future reader might otherwise "helpfully" undo.

### README files — the entry point to a project

A good README typically includes: what the project does, how to install/set up dependencies, how
to run it locally, and how to run tests — essentially, everything a new contributor (or future you,
returning after months away) needs to get started without guessing.

```markdown
# My App

A task management API.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB URI
3. `npm run dev`

## Running tests
`npm test`
```

This directly mirrors the `.env.example` convention from the Backend module — documentation and
that specific practice work together, both aimed at making a project's setup requirements clear
without exposing actual secrets.

### API documentation — describing a contract for consumers

For an API meant to be used by others (or your own frontend, developed somewhat independently),
documenting each endpoint's expected request shape, response shape, and possible error responses
is genuinely valuable — tools like Swagger/OpenAPI can generate this from annotations in your code,
keeping documentation closer to staying in sync with the actual implementation.

### Docstrings — function-level documentation

```python
def calculate_discount(price, is_vip):
    """
    Calculate the final price after applying VIP discount if applicable.

    Args:
        price: The original price before discount.
        is_vip: Whether the customer has VIP status.

    Returns:
        The price after applying a 20% discount for VIP customers, otherwise unchanged.
    """
    return price * 0.8 if is_vip else price
```

Genuinely useful for functions with non-obvious parameters, return values, or behavior — less
necessary for small, self-explanatory functions where the signature and body already communicate
everything needed.

### The real risk of over-documentation

Documentation that duplicates what clean, well-named code already clearly expresses adds
maintenance burden without real benefit — worse, documentation that goes **out of sync** with the
actual code it describes becomes actively misleading, arguably worse than no documentation at all.
This is a genuine, real cost worth weighing against documentation's benefits.

## Simple Example

```javascript
/**
 * Calculates shipping cost based on order weight and destination.
 * Uses a flat rate below 5kg; above that, charges per additional kg,
 * per our shipping provider's tiered pricing agreement (see contract §4.2).
 */
function calculateShipping(weightKg, destination) {
  const baseRate = destination === "international" ? 15 : 5;
  if (weightKg <= 5) return baseRate;
  return baseRate + (weightKg - 5) * 2;
}
```

## Let's Break It Down

- The comment explains the *business reasoning* behind the specific pricing tiers (referencing an
  actual contract) — information the code itself, however clearly written, couldn't convey on its
  own.
- The code itself remains clear and doesn't need line-by-line comments explaining *what* each
  calculation does — the variable names and structure already communicate that.

## Common Mistakes

- **Writing comments that restate what clear code already says**, adding noise rather than value.
- **Letting documentation drift out of sync with the actual code**, becoming actively misleading
  over time.
- **Providing no README or setup instructions at all**, forcing every new contributor to
  reverse-engineer how to even get the project running.
- **Over-documenting genuinely simple, self-explanatory code**, treating documentation as a box to
  check rather than a tool to actually help readers.

## When Should I Use It?

Write comments for non-obvious *why*, not obvious *what*. Maintain a README with clear setup/run
instructions for every real project. Document API contracts for anything consumed by other
developers or systems you don't fully control. Keep documentation close to the code it describes,
and update it deliberately whenever the underlying behavior changes.

## Exercises

1. **(Recall)** What's the key distinction between a comment explaining "what" versus "why"?
2. **(Application)** Write a README setup section for a project requiring `npm install`, an
   environment variable `API_KEY`, and started via `npm start`.
3. **(Problem Solving)** A project's README says "run `npm start`" but the actual command in
   `package.json` is now `npm run dev`. Explain the real cost of this kind of documentation drift.

## What Should I Learn Next?

Continue to
[`10-git-workflows-and-branching`](../10-git-workflows-and-branching) — applying the git
collaboration workflows from the Git module on a real, evolving project.
