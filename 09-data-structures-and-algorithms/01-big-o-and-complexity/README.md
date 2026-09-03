# Big O & Complexity

**Module:** Data Structures & Algorithms
**Prerequisites:** [`03-javascript`](../../03-javascript) or [`04-python`](../../04-python)

## What is it?

This topic gives a rigorous, precise treatment of **Big O notation** — building on the informal
introduction from Fundamentals — the standard way computer scientists and engineers describe how an
algorithm's time or memory needs scale as input size grows.

## Why does it matter?

Every data structure and algorithm in this module gets evaluated using Big O — it's the shared
vocabulary for reasoning about "is this approach actually going to work at real scale," independent
of any specific computer's speed.

## How does it work?

### What Big O actually measures

Big O describes the **growth rate** of an algorithm's resource use (time or space) as input size
(conventionally called `n`) grows — specifically, it describes the **worst case** by convention
(though best-case and average-case analyses exist too), and it deliberately ignores constant
factors and lower-order terms, focusing only on how things scale as `n` gets very large.

### The common complexity classes, precisely

- **O(1)** — constant time. The same number of operations regardless of input size (accessing
  `array[5]` directly).
- **O(log n)** — logarithmic. Each step eliminates a large fraction of remaining possibilities
  (binary search).
- **O(n)** — linear. Work scales directly with input size (a single loop through an array).
- **O(n log n)** — "linearithmic." Common for efficient sorting algorithms (merge sort, quicksort on
  average).
- **O(n²)** — quadratic. Common with nested loops over the same data (comparing every pair of
  items).
- **O(2ⁿ)** — exponential. Work doubles with every additional input element — genuinely impractical
  beyond small inputs (naive recursive solutions to certain problems).

### Analyzing code directly

```javascript
function findMax(arr) {          // O(n) - one loop through the array
  let max = arr[0];
  for (const n of arr) {
    if (n > max) max = n;
  }
  return max;
}

function hasDuplicate(arr) {      // O(n^2) - nested loop, comparing every pair
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
```

A single loop through `n` items is O(n). A loop nested inside another loop, both scaling with `n`,
multiplies to O(n²) — the exact pattern flagged as a real, common performance risk in the
Fundamentals lesson, now given precise vocabulary.

### Dropping constants and lower-order terms

```javascript
function process(arr) {
  console.log(arr[0]);           // O(1)
  for (const item of arr) {       // O(n)
    console.log(item);
  }
  for (const item of arr) {        // another O(n)
    console.log(item);
  }
}
```

This function technically does `1 + n + n` operations, which simplifies to `2n + 1` — but Big O
notation drops constants and lower-order terms, describing this as simply **O(n)**, since what
matters for scaling behavior is the dominant term as `n` grows large; the constant `2` and the `+1`
become negligible at scale.

### Space complexity — the same idea, applied to memory

```javascript
function double(arr) {
  return arr.map(n => n * 2); // creates a NEW array, same size as input -> O(n) space
}

function doubleInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] *= 2; // modifies the existing array -> O(1) additional space
  }
  return arr;
}
```

Both functions are O(n) in *time* (one pass through the array), but differ in **space**: `double`
allocates a brand-new array proportional to the input size (O(n) additional space); `doubleInPlace`
modifies the existing array directly, using only a constant, fixed amount of additional memory
(O(1)), regardless of input size.

## Simple Example

```javascript
function sumPairs(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      results.push(arr[i] + arr[j]);
    }
  }
  return results;
}
```

## Let's Break It Down

- The nested loops give this O(n²) time complexity — for each of the `n` items, the inner loop runs
  roughly `n` more times.
- `results` grows to hold roughly n²/2 pairs, so this is also O(n²) in space — both time and space
  scale quadratically here, worth noting explicitly since they don't always match for a given
  algorithm.

## Common Mistakes

- **Only considering time complexity, ignoring space complexity**, missing a genuinely important
  cost, especially for large inputs or memory-constrained environments.
- **Assuming Big O gives an exact operation count** rather than a growth-rate description — O(n) for
  one algorithm and O(n) for another doesn't mean they take the exact same time, just that they
  scale similarly.
- **Fixating on optimizing an algorithm's Big O for genuinely small, fixed-size input**, where the
  difference is practically meaningless and clarity should take priority.

## When Should I Use It?

Use Big O analysis when reasoning about how an algorithm or data structure choice will perform as
real data grows — genuinely important for anything processing meaningfully large or growing
datasets, less critical for small, bounded, one-off operations.

## Exercises

1. **(Recall)** What does Big O notation describe, and why are constants/lower-order terms dropped?
2. **(Application)** Determine the time complexity of a function that loops through an array once,
   then does a single lookup in a hash table for each item.
3. **(Problem Solving)** A colleague says "this function is O(2n), so it's twice as slow as an O(n)
   function." Explain what's imprecise about this statement.

## What Should I Learn Next?

Continue to [`02-arrays-and-strings`](../02-arrays-and-strings) — the most fundamental data
structure, examined with precise complexity analysis for its common operations.
