# Algorithms & Complexity (Intro)

**Module:** Programming Fundamentals
**Prerequisites:** [`09-error-handling-and-debugging`](../09-error-handling-and-debugging)

## What is it?

An **algorithm** is simply a step-by-step procedure for solving a specific problem — a recipe.
**Complexity** describes how the *time* or *memory* an algorithm needs changes as the size of its
input grows. This is a gentle, intuitive first look — the full, rigorous treatment (Big O notation,
formal analysis of many specific algorithms) lives in its own dedicated module,
[`09-data-structures-and-algorithms`](../../09-data-structures-and-algorithms).

## Why does it matter?

You've already been writing algorithms this whole module, without necessarily calling them that —
every function you've written is a small algorithm. What's new here is starting to ask: "if the
input to this got 10 times bigger, would this still run fast enough?" Two pieces of code can
produce the exact same correct answer, while one becomes unusably slow on large input and the other
doesn't — understanding why is a genuinely important professional skill, not just an academic one.

## Mental Model

Imagine looking for a specific name in a phone book two different ways. **Method one:** start at
page one, and check every single name until you find it — if the book doubles in size, your search
could take twice as long in the worst case. **Method two:** open to the middle, see whether your
name comes before or after that point alphabetically, and repeat that "narrow it down by half"
approach — if the book doubles in size, this method only needs *one extra step*, not double the
work. Both methods work, but they scale completely differently as the phone book grows. That
difference in *scaling behavior* is exactly what complexity measures.

## How does it work?

### The same problem, two different algorithms

```javascript
// Method 1: check every single item — "linear" approach
function containsValue(arr, target) {
  for (const item of arr) {
    if (item === target) {
      return true;
    }
  }
  return false;
}
```

```javascript
// Method 2: assumes arr is already sorted — "binary search" approach
function containsValueSorted(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return true;
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return false;
}
```

Both functions correctly answer "is `target` in this array?" — but they scale very differently.
`containsValue` might have to check every single item in the worst case (the target is last, or
missing entirely) — if the array has 1,000 items, that's up to 1,000 checks; 1,000,000 items, up to
1,000,000 checks. `containsValueSorted` eliminates *half* of the remaining possibilities with every
single step (just like the phone book) — for 1,000,000 items, it needs roughly 20 steps at most, not
a million. That gap grows dramatically as the input size grows, even though both functions are
"correct."

### A first, informal look at Big O notation

Computer science uses a notation called **Big O** to describe this scaling behavior precisely,
independent of any specific computer's speed. You'll see terms like:

- **O(1)** — "constant time" — the same number of steps regardless of input size (e.g. accessing
  `array[0]` directly).
- **O(n)** — "linear time" — the number of steps grows directly in proportion to the input size
  (e.g. `containsValue` above — checking every item once).
- **O(log n)** — "logarithmic time" — the number of steps grows very slowly as input size grows,
  because each step eliminates a large chunk of remaining possibilities (e.g.
  `containsValueSorted` above).
- **O(n²)** — "quadratic time" — the number of steps grows with the *square* of the input size,
  common with nested loops over the same data (e.g. comparing every item to every other item).

This is only an informal preview — the full module covers how to actually analyze your own code
this way, and works through many real algorithms with their exact complexities. The important
takeaway for now: **the same correct answer can be produced by algorithms with wildly different
scaling behavior, and that difference becomes very real once the input is large enough.**

### Why this connects back to nested loops

Recall from the Loops lesson that a nested loop's total work multiplies, not adds — a loop inside a
loop, each running `n` times, does roughly `n * n` (that is, `n²`) total work. This is exactly the
kind of pattern Big O is built to describe and warn you about: code that looks simple and correct
on a small test case can become dramatically, sometimes unusably, slow the moment it's run on
realistically large data — a genuine, common source of real-world performance problems.

## Simple Example

```javascript
function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return true;
      }
    }
  }
  return false;
}
```

## Let's Break It Down

- This function checks whether any two items in `arr` are equal, by comparing every item against
  every other item that comes after it.
- The outer loop runs roughly `n` times; for each of those, the inner loop runs roughly `n` times
  too — giving roughly `n * n = n²` total comparisons in the worst case.
- For a 10-item array, that's around 100 comparisons — completely fine. For a 100,000-item array,
  that's around 10,000,000,000 comparisons — this would take a genuinely long time to run, and is a
  realistic example of code that "works" on a small test but becomes impractical at real scale.
- A different approach — using a hash-table-based structure (covered properly in the DSA module) —
  can solve this same problem in roughly `n` steps instead of `n²`, a dramatic difference at scale.

## Common Mistakes

- **Only testing code on small, convenient input sizes**, and never considering what happens as
  data grows — a function can look perfectly fine in development and become a real bottleneck in
  production with realistic amounts of data.
- **Assuming "it runs fast on my machine" generalizes** — performance problems caused by poor
  complexity often don't show up until the input is significantly larger than whatever was tested.
- **Reaching for a "clever," complex algorithm before it's actually needed.** Not every piece of
  code needs to be maximally optimized — for genuinely small, fixed-size data, the simplest correct
  approach is often the right choice; complexity awareness is about knowing *when* it starts to
  matter, not treating every line of code as a performance emergency.

## When Should I Use It?

Start thinking about complexity once your code processes data whose size isn't small and fixed —
especially anything involving loops over real, growing datasets (user records, search results,
anything from a database). For small, bounded amounts of data, prioritize clarity over
micro-optimization; the scaling behavior only starts to matter once "n" can realistically get
large.

## Exercises

1. **(Recall)** In plain language, what does "O(n)" mean about how an algorithm's work scales with
   input size?
2. **(Understanding)** Using the phone book analogy, explain why binary search is dramatically
   faster than checking every page, especially for very large books.
3. **(Application)** Look at the `hasDuplicates` function above. If the array has 10 items, roughly
   how many comparisons happen in the worst case? What about 1,000 items?
4. **(Problem Solving)** A colleague says: "My function works perfectly in testing, so performance
   isn't something I need to think about." Using what you learned in this lesson, explain what
   might be missing from that reasoning.

## What Should I Learn Next?

Continue to [`11-memory-basics`](../11-memory-basics) — complexity is about *time*; this next topic
covers the other resource algorithms use: memory, and how your program actually stores the values
you've been working with all module.
