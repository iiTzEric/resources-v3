# Recognizing Hallucinated APIs

**Module:** Working With AI Tools
**Prerequisites:** [`03-debugging-ai-generated-code`](../03-debugging-ai-generated-code)

## What is it?

A **hallucination**, in this context, is AI confidently generating a reference to a function,
method, library, or parameter that doesn't actually exist — presented with exactly the same
confident, fluent tone as genuinely correct code, making it genuinely hard to distinguish at a
glance.

## Why does it matter?

This is a real, specific, and common failure mode — not a rare edge case. Code referencing a
non-existent method will fail the moment it actually runs, but recognizing the *pattern* early
(before wasting time debugging "your own mistake" that's actually a hallucination) is a genuinely
valuable, learnable skill.

## How does it work?

### What a hallucination typically looks like

```javascript
// Looks entirely plausible, reads fluently -- but Array.prototype.groupBy
// did not exist in standard JavaScript at time of writing
const grouped = items.groupBy(item => item.category);
```

This reads exactly like real, idiomatic JavaScript — matching the style of genuine array methods
you've learned (`.map()`, `.filter()`, `.reduce()`) — which is precisely what makes hallucinations
dangerous: they're stylistically indistinguishable from correct usage without independent
verification.

### The concrete verification habit

**Check official documentation for anything you're not already confident exists** — MDN for
JavaScript/Web APIs, the official docs for a specific library or framework, the Python standard
library docs. This single habit catches the large majority of hallucinations before they ever reach
running code.

```javascript
// Before trusting this exists, check MDN:
"Array.prototype.groupBy" site:developer.mozilla.org
```

### Why this happens — a brief, honest explanation

AI language models generate text based on patterns learned from training data — they don't have
built-in, guaranteed access to verify "does this specific method actually exist in this specific
version of this library" the way a compiler or a real IDE with type-checking does. A plausible-
sounding method name, especially one that *would* fit naturally alongside real methods you know,
can get generated with exactly the same confident fluency as accurate information.

### Signs worth extra scrutiny

- A method name that sounds suspiciously convenient for exactly your specific situation.
- Library usage for a package or version you're not personally familiar with.
- Any API you can't immediately recall having seen used elsewhere yourself.

None of these guarantee a hallucination — but they're worth a quick, deliberate verification check
before trusting them, rather than assuming correctness by default.

### The fastest real check: just try running it

Since a hallucinated method will genuinely fail the instant it actually executes (`TypeError: ...is
not a function`), simply running the code — the same non-negotiable habit from Verifying AI-
Generated Code — catches this specific failure mode immediately and unambiguously, even without
manually checking documentation first.

## Simple Example

```javascript
// A genuinely hallucinated example
const uniqueItems = array.distinct(); // Array.prototype.distinct does not exist in JS
```

versus the real, correct approach:

```javascript
const uniqueItems = [...new Set(array)]; // the actual, real way to get unique values
```

## Let's Break It Down

- `.distinct()` reads entirely plausibly — it's a real method name in some other languages/
  libraries (like C#'s LINQ), which may be exactly why an AI model might generate it here, blending
  patterns from different contexts.
- Running this code would immediately throw `TypeError: array.distinct is not a function` — the
  fastest, most definitive way to catch this specific hallucination.
- The real JavaScript approach uses `Set` (a genuine, real JavaScript feature covered in your Hash
  Tables topic's broader family of structures) combined with spread syntax — worth recognizing as
  the actual correct pattern.

## Common Mistakes

- **Assuming fluent, confident-sounding code must be correct**, without independent verification
  against real documentation.
- **Not immediately recognizing a `TypeError: ...is not a function` as a likely hallucination**,
  instead assuming your own environment or usage must be at fault.
- **Extending trust to an entire code block because one part of it is clearly correct** — a
  hallucination can appear alongside otherwise perfectly valid code.

## When Should I Use It?

Apply extra scrutiny (checking real documentation, or simply running the code) to any AI-generated
reference to a method, function, or library feature you're not already confident genuinely exists —
especially for less-common methods, newer language features, or libraries you're not personally
familiar with.

## Exercises

1. **(Recall)** What makes hallucinated code genuinely difficult to distinguish from correct code
   just by reading it?
2. **(Application)** Given an unfamiliar method name in AI-generated code, describe the concrete
   steps you'd take to verify it actually exists before using it.
3. **(Problem Solving)** Code throws `TypeError: string.toTitleCase is not a function`. Explain
   what this error strongly suggests, and what your next step should be.

## What Should I Learn Next?

Continue to
[`05-human-decisions-vs-ai-assistance`](../05-human-decisions-vs-ai-assistance) — which
decisions should remain deliberately yours, regardless of how capable AI assistance becomes.
