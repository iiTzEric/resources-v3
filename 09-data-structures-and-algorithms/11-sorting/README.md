# Sorting Algorithms

**Module:** Data Structures & Algorithms
**Prerequisites:** [`10-searching`](../10-searching)

## What is it?

This topic covers several common sorting algorithms — bubble sort, merge sort, and quicksort —
comparing their approaches and complexity, and closing out this module by tying sorting back to
binary search's prerequisite from the previous topic.

## Why does it matter?

Sorting is one of the most fundamental, heavily-studied problems in computer science, and comparing
different approaches is a genuinely excellent way to build intuition for how algorithmic choices
affect real performance at scale.

## How does it work?

### Bubble sort — simple, but O(n²)

```javascript
function bubbleSort(arr) {
  const sorted = [...arr];
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < sorted.length - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]]; // swap using destructuring
      }
    }
  }
  return sorted;
}
```

Repeatedly steps through the array, swapping adjacent out-of-order elements, "bubbling" larger
values toward the end. Simple to understand and implement, but genuinely O(n²) — the nested loop
structure should be immediately recognizable from the Big O topic as a performance red flag for
large inputs.

### Merge sort — O(n log n), a "divide and conquer" approach

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // base case

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // recursively sort left half
  const right = mergeSort(arr.slice(mid));      // recursively sort right half

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
```

**Divide and conquer**: recursively split the array in half (connecting directly to the Recursion
topic) until reaching trivially-sorted single-element pieces, then merge those sorted pieces back
together. This achieves O(n log n) — the `log n` comes from repeatedly halving the array
(mirroring binary search's own logarithmic behavior), and the `n` comes from the merging work
required at each level.

### Quicksort — O(n log n) average case, a different divide-and-conquer strategy

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

Picks a **pivot** element, partitions the rest into "smaller than pivot" and "greater than/equal to
pivot" groups, then recursively sorts each group. Average case O(n log n), though — unlike merge
sort — its **worst case** is O(n²) (occurring with poor pivot choices on already-sorted or
adversarially-crafted input) — a genuine, important distinction between average-case and worst-case
behavior for the same algorithm.

### Comparing the three, honestly

- **Bubble sort**: simple to understand, but O(n²) — rarely used in real production code beyond
  teaching contexts or genuinely tiny datasets.
- **Merge sort**: reliable O(n log n) in all cases, but requires additional memory (O(n) space) for
  the merging process.
- **Quicksort**: average-case O(n log n), often faster in practice than merge sort due to lower
  constant-factor overhead, but with a genuine worst-case O(n²) risk depending on pivot selection
  strategy.

### Why you rarely implement sorting yourself in real code

```javascript
[3, 1, 4, 1, 5].sort((a, b) => a - b); // built-in, highly optimized
```

Nearly every language provides a well-tested, highly optimized built-in sort — real production code
almost always uses this rather than a hand-rolled implementation. Learning these algorithms isn't
primarily about replacing the built-in sort; it's about building the algorithmic thinking (divide
and conquer, complexity tradeoffs, average vs. worst case) that transfers to countless other
problems beyond sorting itself.

## Simple Example

```javascript
console.log(mergeSort([5, 2, 8, 1, 9, 3]));
// [1, 2, 3, 5, 8, 9]
```

## Let's Break It Down

- The array splits into `[5, 2, 8]` and `[1, 9, 3]`, each recursively split further until reaching
  single elements (trivially sorted).
- These single elements merge back together in sorted order, pair by pair, building progressively
  larger sorted subarrays, until the final `merge` call combines two fully-sorted halves into the
  complete result.
- This is the concrete, traced-through version of the "divide and conquer" idea described above.

## Common Mistakes

- **Assuming all O(n log n) algorithms perform identically in practice** — constant factors and
  worst-case behavior (like quicksort's O(n²) worst case) genuinely matter beyond just the Big O
  classification.
- **Hand-implementing sorting in real production code** instead of using a language's well-tested,
  optimized built-in sort, without a genuinely specific reason to do otherwise.
- **Forgetting merge sort's additional O(n) space requirement** when space is a genuine constraint,
  where an in-place algorithm might be preferable despite other tradeoffs.

## When Should I Use It?

Use a language's built-in sort for real applications, virtually always. Understand these
algorithms' underlying approaches and tradeoffs to build the algorithmic thinking skills that
transfer broadly — recognizing divide-and-conquer opportunities, and reasoning carefully about
average-case versus worst-case behavior in your own code.

## Exercises

1. **(Recall)** What is "divide and conquer," and how do both merge sort and quicksort apply it?
2. **(Understanding)** Explain why quicksort's average case is O(n log n) but its worst case is
   O(n²).
3. **(Application)** Trace through merge sort's recursive splitting for the array `[8, 3, 5, 1]`,
   down to the base case, then show the merging steps back up.

## What Should I Learn Next?

This completes the Data Structures & Algorithms module. Continue to
[`10-software-engineering-practices`](../../10-software-engineering-practices) — the professional
practices that shape how real, well-engineered software gets built, beyond algorithms and syntax
alone.
