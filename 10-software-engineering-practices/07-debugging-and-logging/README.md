# Debugging & Logging (Advanced)

**Module:** Software Engineering Practices
**Prerequisites:** [`06-testing-unit-integration-e2e`](../06-testing-unit-integration-e2e)

## What is it?

This topic builds on the systematic debugging process from Fundamentals with more advanced
strategies — using a real debugger instead of only `console.log`, and binary-search-style
debugging for narrowing down where a problem originates in a larger codebase.

## Why does it matter?

As applications grow, "add a `console.log` and guess" becomes less efficient — genuinely
systematic techniques (borrowed conceptually from the binary search algorithm you've now studied
formally) become increasingly valuable for larger, more complex problems.

## How does it work?

### Using a real debugger instead of only `console.log`

Most environments (browser DevTools, VS Code, Node) include a real debugger, letting you:

```javascript
function calculateTotal(items) {
  debugger; // execution pauses here when DevTools/debugger is open
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

Pausing at a `debugger` statement (or a manually set breakpoint in your editor/DevTools) lets you
inspect every variable's actual current value, step through code line by line, and see the real
call stack — often faster and more thorough than sprinkling `console.log` statements throughout
your code and re-running repeatedly.

### Binary-search debugging — applying the algorithm you've now studied

When a bug's location is unclear across a large amount of code, apply the same halving strategy
from binary search: check whether the problem exists at the *midpoint* of the suspect code (adding
a log or breakpoint partway through a long process), narrowing the search space by half each time,
rather than checking every line sequentially from the start. This directly mirrors the O(log n)
efficiency gain from the Searching Algorithms topic, applied to the "search space" of your own
code.

### `git bisect` — binary search applied to git history

```bash
git bisect start
git bisect bad          # the current commit has the bug
git bisect good v1.2.0   # this earlier commit was known to work correctly
# git checks out a commit halfway between them; you test and mark it good/bad
# repeat until git identifies the exact commit that introduced the bug
```

`git bisect` automates exactly this binary-search strategy across your commit history —
genuinely useful for finding precisely which commit introduced a regression, especially in a large
project with many commits since the bug was last known to be absent.

### Reproducing a bug reliably — the essential first step

Before attempting to fix anything, establish a reliable way to *reproduce* the bug on demand — an
intermittent, unreliable reproduction makes it genuinely difficult to know whether a fix actually
worked, or the bug simply didn't happen to occur that particular time.

### Rubber duck debugging — explaining the problem out loud

A genuinely effective, well-known technique: explain your code and the problem, line by line, out
loud, to another person (or literally an inanimate object, like a rubber duck) — the act of
articulating your assumptions explicitly frequently reveals the actual flawed assumption yourself,
without the "listener" needing to say anything at all.

## Simple Example

A realistic scenario using binary-search-style debugging in code:

```javascript
function processLargeDataset(items) {
  const step1 = transform(items);
  // console.log("after step1:", step1) -- check the midpoint first
  const step2 = filter(step1);
  const step3 = aggregate(step2);
  return step3;
}
```

## Let's Break It Down

- Rather than adding a `console.log` after every single step from the start, checking the *middle*
  step first (`step1`) narrows down whether the bug is in the first half (`transform`) or second
  half (`filter`/`aggregate`) of the pipeline in one check.
- If `step1` looks correct, the next check would be at the midpoint of the *remaining* suspect
  code (between `step2` and `step3`) — the same halving strategy, applied recursively, exactly like
  binary search's own approach.

## Common Mistakes

- **Checking every single line sequentially from the start**, an O(n) debugging strategy, when a
  binary-search approach would find the problem in O(log n) checks.
- **Attempting to fix a bug before reliably reproducing it**, risking a "fix" that doesn't actually
  address the real, underlying cause.
- **Relying solely on `console.log` for genuinely complex debugging** when a real debugger would
  let you inspect state far more thoroughly and efficiently.

## When Should I Use It?

Use binary-search-style debugging (manually, or via `git bisect`) once a bug's location isn't
immediately obvious across a meaningful amount of code or commit history. Use a real debugger for
complex state inspection beyond what scattered `console.log` calls conveniently reveal.

## Exercises

1. **(Recall)** How does `git bisect` apply the same underlying strategy as binary search?
2. **(Application)** Describe how you'd apply binary-search-style debugging to find which of 8
   sequential data-processing steps is introducing a bug.
3. **(Problem Solving)** A bug only happens "sometimes," and you can't reliably reproduce it.
   Explain why this makes debugging genuinely harder, and describe one strategy for narrowing down
   the conditions that trigger it.

## What Should I Learn Next?

Continue to [`08-code-reviews`](../08-code-reviews) — getting a second, independent perspective on
code before it becomes part of a shared codebase.
