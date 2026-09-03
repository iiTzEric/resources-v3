# Searching Algorithms

**Module:** Data Structures & Algorithms
**Prerequisites:** [`09-recursion`](../09-recursion)

## What is it?

This topic formalizes **linear search** and **binary search** — referenced conceptually several
times already throughout this module (the phone book analogy from Fundamentals, BST search) — now
covered directly, with precise implementations and complexity analysis.

## Why does it matter?

These two searching strategies, and the assumptions each relies on, underlie an enormous amount of
real algorithmic thinking — recognizing when data's structure (specifically, whether it's sorted)
enables a dramatically faster search is a genuinely valuable, transferable skill.

## How does it work?

### Linear search — O(n)

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

Checks every element in order until finding a match (or reaching the end) — works on **any** array,
sorted or not, but in the worst case requires checking every single element.

### Binary search — O(log n), but requires sorted data

```javascript
function binarySearch(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}
```

By checking the middle element and eliminating half of the remaining possibilities each step
(exactly the phone book strategy from Fundamentals), binary search achieves O(log n) — a dramatic
improvement over linear search's O(n) for large datasets. **The critical requirement**: the data
must already be sorted — binary search's entire logic (deciding whether to search left or right)
depends on this ordering; running it on unsorted data produces incorrect, unreliable results.

### The recursive version of binary search

```javascript
function binarySearchRecursive(sortedArr, target, low = 0, high = sortedArr.length - 1) {
  if (low > high) return -1; // base case: not found

  const mid = Math.floor((low + high) / 2);
  if (sortedArr[mid] === target) return mid;
  if (sortedArr[mid] < target) {
    return binarySearchRecursive(sortedArr, target, mid + 1, high);
  }
  return binarySearchRecursive(sortedArr, target, low, mid - 1);
}
```

This directly applies the recursion concepts from the previous topic — the base case is "the search
range is empty" (`low > high`), and each recursive call operates on a genuinely smaller range,
guaranteeing eventual termination.

### The real tradeoff: is sorting worth it?

If you need to search an unsorted array **many times**, sorting it once upfront (an O(n log n) cost,
covered in the Sorting topic) and then using binary search repeatedly (O(log n) per search) can be
dramatically more efficient overall than repeated linear searches (O(n) each time) — this is a
genuine, practical tradeoff calculation worth making deliberately, not a universal rule that sorting
is always worthwhile.

## Simple Example

```javascript
const sortedScores = [10, 25, 33, 47, 52, 68, 79, 91];
console.log(binarySearch(sortedScores, 52)); // 4
console.log(binarySearch(sortedScores, 100)); // -1
```

## Let's Break It Down

- Searching for `52`: check the middle (`47`, index 3) — `52 > 47`, so search the right half only.
  Check the new middle (`68`, index 5) — `52 < 68`, so search the left half of that remaining range.
  Check `52` directly — found at index 4. This took just 3 comparisons for an 8-element array,
  versus up to 8 comparisons for linear search in the worst case.
- Searching for `100` (not present): the search range eventually becomes empty (`low > high`),
  correctly returning `-1`.

## Common Mistakes

- **Running binary search on unsorted data**, producing unreliable, incorrect results, since the
  algorithm's core logic assumes an ordering that doesn't actually hold.
- **Off-by-one errors in the `low`/`high`/`mid` boundary updates** — a genuinely common, subtle
  source of bugs specifically in binary search implementations.
- **Sorting data solely to perform a single search**, when the O(n log n) sorting cost exceeds the
  benefit for a one-time search (a single linear search, O(n), would simply be cheaper overall in
  that specific case).

## When Should I Use It?

Use linear search on unsorted data, or when you only need to search once. Use binary search on
already-sorted data, or when you'll perform many repeated searches (making the one-time sorting
cost worthwhile).

## Exercises

1. **(Recall)** What critical assumption does binary search rely on that linear search doesn't?
2. **(Application)** Trace through binary search manually to find `33` in
   `[10, 25, 33, 47, 52, 68, 79, 91]`, listing each comparison made.
3. **(Problem Solving)** A developer runs binary search on an unsorted array and gets an incorrect
   "not found" result for a value that's actually present. Explain precisely why this happens.

## What Should I Learn Next?

Continue to [`11-sorting`](../11-sorting) — algorithms for actually producing the sorted data
binary search (and many other techniques) depend on.
