# Performance & Maintainability

**Module:** Software Engineering Practices
**Prerequisites:** [`12-security-practices`](../12-security-practices)

## What is it?

This closing topic addresses the genuine, ongoing tension between shipping quickly and keeping a
codebase healthy long-term — synthesizing performance-mindedness (from the Fundamentals, DSA, and
React Performance topics) and maintainability (from Clean Code, Separation of Concerns, and
Refactoring) into a single, balanced perspective.

## Why does it matter?

Every real engineering decision involves tradeoffs between these forces — moving fast now, versus
keeping the codebase easy and safe to change later. Neither extreme (endless polish and
optimization with nothing ever shipped, or reckless speed with an increasingly unmaintainable
result) serves a project well.

## How does it work?

### Premature optimization — a real, recurring risk

Recall from React's Performance topic: `useMemo`/`useCallback`/`React.memo` add real complexity for
a performance benefit that's often negligible until actually measured and confirmed necessary. This
same caution applies broadly — optimizing code before you know it's actually a bottleneck often
wastes effort and adds complexity for no real benefit.

```javascript
// Premature optimization -- adds real complexity for an unmeasured, assumed benefit
const memoizedResult = useMemo(() => simpleCalculation(a, b), [a, b]);

// Simpler, and likely just as fast in practice for a cheap calculation
const result = simpleCalculation(a, b);
```

### Measuring before optimizing

The correct sequence: build something correct and reasonably clear first, **measure** its actual
performance (using real profiling tools, not assumptions), and *then* optimize the parts that
measurement reveals as genuine bottlenecks — not the parts that merely *seem* like they might be
slow.

### Maintainability — the long-term cost of moving fast carelessly

Recall the Technical Debt topic: shortcuts taken to move quickly accrue a real, compounding cost if
never addressed. A codebase that's fast to modify safely, months or years later, is itself a form
of long-term "performance" — the speed of the *development process*, not just the running
application.

### Balancing the two — a practical framework

- **Ship the simplest correct version first** (KISS, from earlier this module).
- **Write tests** so future changes (including future optimizations) can be made with confidence.
- **Measure real performance** before optimizing anything specific.
- **Refactor deliberately**, as genuine friction or measured performance problems actually emerge —
  not preemptively, based on assumption.
- **Track technical debt explicitly** when a deliberate shortcut is taken, so it doesn't silently
  compound unnoticed.

### A concrete example of this balance in practice

A team ships a feature using a straightforward, unoptimized database query. Weeks later, real usage
data (not assumption) shows this specific query is genuinely slow under real load. *Now*, informed
by real measurement, they add an appropriate index (from the Databases module) — a deliberate,
justified optimization, rather than one applied preemptively to every query "just in case,"
regardless of whether it was ever actually a bottleneck.

## Simple Example

A brief, realistic engineering narrative tying this together:

```
1. Ship a working feature with straightforward, clear code (prioritize correctness and clarity)
2. Add tests covering its core behavior (enables safe future changes)
3. Monitor real performance in production (measurement, not assumption)
4. A specific slow query is identified via real monitoring data
5. Add a targeted index for that specific, measured bottleneck (Databases module)
6. Refactor the surrounding code only if it's now also genuinely hard to maintain,
   not preemptively
```

## Let's Break It Down

- Steps 1-2 prioritize correctness, clarity, and safety-net test coverage first — deliberately not
  optimizing anything yet.
- Step 3-4 introduce real measurement before any optimization decision is made — the entire point
  being avoiding guesswork about what's actually slow.
- Step 5 is a targeted, justified fix for a confirmed, real problem — not a blanket, preemptive
  optimization pass across the whole codebase.
- Step 6 keeps refactoring similarly deliberate — driven by genuine, observed friction, not
  assumption or a desire for abstract "cleanliness."

## Common Mistakes

- **Optimizing before measuring**, spending effort on assumed bottlenecks that may not actually be
  significant, while genuine bottlenecks go unaddressed.
- **Never revisiting deliberate shortcuts**, letting technical debt silently compound past the point
  it was originally a reasonable tradeoff.
- **Treating maintainability and shipping speed as strictly opposed**, rather than recognizing that
  a genuinely maintainable codebase actually *enables* sustained shipping speed over the long run,
  while a neglected one eventually slows everything down.

## When Should I Use It?

Apply this balance as an ongoing engineering discipline throughout a project's life: ship simply and
correctly first, measure before optimizing, and address technical debt and maintainability
deliberately as real friction emerges — not as an afterthought, and not preemptively based on
untested assumptions.

## Exercises

1. **(Recall)** What's the correct sequence this topic describes for approaching performance
   optimization?
2. **(Understanding)** Explain why a genuinely maintainable codebase can be considered a form of
   long-term "performance," beyond just the running application's speed.
3. **(Application)** A teammate wants to add caching to every database query "to be safe,"
   before any performance issue has been observed. How would you respond, using this topic's
   guidance?

## What Should I Learn Next?

This completes the Software Engineering Practices module. Continue to
[`11-working-with-ai`](../../11-working-with-ai) — using AI tools effectively throughout your
engineering work, without becoming dependent on them or shipping code you don't understand.
