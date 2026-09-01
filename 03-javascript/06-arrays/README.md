# Arrays

**Module:** JavaScript
**Prerequisites:** [`05-scope-and-closures`](../05-scope-and-closures)

## What is it?

This topic covers JavaScript's array methods in depth — especially `map`, `filter`, and `reduce` —
which let you transform and query arrays declaratively (describing *what* result you want) instead
of manually writing `for` loops (describing *how* to get there, step by step).

## Why does it matter?

Nearly all real-world JavaScript — rendering lists in React, transforming API data, filtering search
results — is built on these array methods. They're not just shorter than loops; they express intent
more directly, and are genuinely the idiomatic, expected style in modern JavaScript.

## How does it work?

### `.map()` — transform every item, get a new array back

```javascript
const prices = [10, 20, 30];
const withTax = prices.map(price => price * 1.1);
// [11, 22, 33] — a brand new array; prices itself is unchanged
```

`.map()` takes a function, runs it against every item, and returns a new array of the results —
always the same length as the original.

### `.filter()` — keep only items that pass a test

```javascript
const ages = [12, 25, 17, 40, 8];
const adults = ages.filter(age => age >= 18);
// [25, 40]
```

The function passed to `.filter()` must return `true`/`false` for each item — items where it
returns `true` are kept in the resulting (possibly shorter) new array; the rest are dropped.

### `.reduce()` — combine every item into a single value

```javascript
const numbers = [1, 2, 3, 4];
const total = numbers.reduce((sum, n) => sum + n, 0);
// 10
```

`.reduce()` is the most general and often the most confusing at first. It takes a function and a
starting value (`0` here). The function receives the running "accumulator" (`sum`) and the current
item (`n`), and returns the new accumulator value for the next step:
`0 → 1 → 3 → 6 → 10`. `.reduce()` can build far more than sums — totals, grouped objects, even
entirely new arrays — but it's worth reaching for `.map()`/`.filter()` first when they alone solve
the problem, since `.reduce()` is more powerful but also less immediately readable.

### Combining methods — chaining

```javascript
const orders = [
  { total: 100, completed: true },
  { total: 50, completed: false },
  { total: 200, completed: true }
];

const totalCompleted = orders
  .filter(order => order.completed)
  .reduce((sum, order) => sum + order.total, 0);
// 300
```

Chaining `.filter()` then `.reduce()` reads almost like a sentence: "take the completed orders, then
sum their totals." This chaining style is extremely common and worth getting comfortable reading and
writing.

### Other useful methods

```javascript
[1, 2, 3].includes(2);         // true
[1, 2, 3].find(n => n > 1);     // 2 — first matching item
[1, 2, 3].some(n => n > 2);      // true — at least one matches
[1, 2, 3].every(n => n > 0);      // true — all match
[1, [2, 3], [4]].flat();           // [1, 2, 3, 4] — flattens nested arrays one level
```

### Mutating versus non-mutating methods — an important distinction

```javascript
const arr = [3, 1, 2];
arr.push(4);      // mutates arr directly
arr.sort();        // mutates arr directly, sorts in place

const arr2 = [3, 1, 2];
const sorted = [...arr2].sort(); // copy first, then sort — arr2 itself is untouched
```

`.map()`, `.filter()`, `.reduce()` never modify the original array — they always return a new one.
`.push()`, `.sort()`, `.splice()` mutate the original array directly. This distinction connects
directly back to the Memory Basics lesson (reference types) and matters a great deal in React,
where mutating state directly (instead of creating new arrays) is a common, serious bug.

## Simple Example

```javascript
const team = [
  { name: "Alice", age: 28 },
  { name: "Ben", age: 34 },
  { name: "Carla", age: 22 }
];

const names = team.map(person => person.name);
const over25 = team.filter(person => person.age > 25);
const totalAge = team.reduce((sum, person) => sum + person.age, 0);

console.log(names, over25, totalAge);
```

## Let's Break It Down

- `names` uses `.map()` to transform each full person object into just their name — a new array of
  strings.
- `over25` uses `.filter()` to keep only people whose `age` passes the test — a shorter array of the
  original objects.
- `totalAge` uses `.reduce()` to combine every person's `age` into one final number.
- None of these three operations modify `team` itself — each produces a completely separate result.

## Common Mistakes

- **Using `.map()` when `.filter()` was actually needed** (or vice versa) — `.map()` always returns
  an array the same length as the original; if you need a shorter array, you want `.filter()`.
- **Forgetting `.filter()`'s callback must return a boolean** — returning a truthy non-boolean value
  (like a property itself) technically "works" due to coercion but obscures intent and risks subtle
  bugs.
- **Mutating an array with `.push()`/`.sort()` when a non-mutating approach was actually needed** —
  especially relevant once you reach React state.
- **Reaching for `.reduce()` for something `.map()` or `.filter()` alone would express more
  clearly.**

## When Should I Use It?

Use `.map()` to transform every item into something new. Use `.filter()` to select a subset. Use
`.reduce()` when combining everything into a single value (a sum, a grouped object) that `.map()`/
`.filter()` alone can't produce. Prefer non-mutating methods when working with data you don't want
to accidentally change elsewhere.

## Exercises

1. **(Recall)** What's the key difference in what `.map()` and `.filter()` each return?
2. **(Application)** Given `const nums = [1,2,3,4,5,6]`, write one line using `.filter()` and
   `.reduce()` chained together to get the sum of only the even numbers.
3. **(Problem Solving)** A developer uses `.map()` to try to remove items from an array that don't
   meet a condition, but ends up with an array full of `undefined` values instead. Explain the
   mistake and the correct method to use.

## What Should I Learn Next?

Continue to [`07-objects`](../07-objects) — arrays organize ordered collections; objects organize
named, structured data, and JavaScript objects have their own set of useful methods worth knowing.
