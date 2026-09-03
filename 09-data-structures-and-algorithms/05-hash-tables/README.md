# Hash Tables

**Module:** Data Structures & Algorithms
**Prerequisites:** [`04-stacks-and-queues`](../04-stacks-and-queues)

## What is it?

A **hash table** stores key-value pairs and provides average-case **O(1)** lookup, insertion, and
deletion — a dramatic improvement over an array's O(n) search. You've actually been using a hash
table this entire curriculum: **JavaScript objects and `Map`s, and Python dictionaries, are both
implemented as hash tables underneath.**

## Why does it matter?

Understanding *why* hash tables achieve O(1) average-case lookup (rather than just accepting it as
a given) explains real, practical behavior — including why keys need to be hashable, and why
collisions matter.

## How does it work?

### The core idea — a hash function converts a key into an array position

```
hash("alice") -> 7  (some computed number)
hash("ben") -> 3
```

A **hash function** takes a key and deterministically computes a number — used as a direct index
into an underlying array. To look up `"alice"`, the hash table computes `hash("alice")`, jumps
**directly** to that array position (an O(1) operation, exactly like array indexing), and finds the
associated value there — no searching through other entries required, which is precisely why this
achieves O(1) average-case performance, in stark contrast to searching an unsorted array by value
(O(n), checking every element).

### Collisions — when two keys hash to the same position

```
hash("alice") -> 7
hash("carol") -> 7  (a collision!)
```

Since a hash function maps a potentially enormous number of possible keys onto a limited number of
array positions, two different keys occasionally hashing to the same position (a **collision**) is
inevitable. Well-designed hash tables handle this (commonly via storing a small list of entries at
each position, checked in the rare case of a collision) — this is why hash table performance is
described as **average-case** O(1), not *worst-case* guaranteed O(1): a poorly-distributed hash
function or an unlucky sequence of collisions could theoretically degrade toward O(n) in a genuine
worst case, though well-implemented hash tables make this rare in practice.

### Why keys need to be consistently hashable

A hash function must produce the *same* output for the *same* input every time, or lookups would
fail unpredictably — this is why, for instance, JavaScript object keys are converted to strings
(a consistent, hashable representation) even if you provide something else.

### Direct, everyday usage — you already know this

```javascript
const scores = new Map();
scores.set("alice", 95);
scores.set("ben", 87);

console.log(scores.get("alice")); // 95 - O(1) average case
console.log(scores.has("carla")); // false - O(1) average case
```

```python
scores = {"alice": 95, "ben": 87}
print(scores.get("alice"))  # 95 - O(1) average case
```

Every time you've used a plain JavaScript object, `Map`, or Python dictionary throughout this
curriculum, you've been using a hash table — this topic is naming and explaining the mechanism
behind something you've already relied on constantly.

### A practical application: solving the "two sum" style problem efficiently

```javascript
function hasPairWithSum(arr, target) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(target - num)) return true;
    seen.add(num);
  }
  return false;
}
```

This solves the same kind of problem as the two-pointer example from the Arrays topic, but for
**unsorted** data, in a single pass — O(n) time, using a hash-table-based `Set` for O(1) average-
case membership checks (`seen.has(...)`) at each step, rather than nested loops checking every pair
(which would be O(n²)).

## Simple Example

```javascript
function countOccurrences(arr) {
  const counts = new Map();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}

console.log(countOccurrences(["a", "b", "a", "c", "b", "a"]));
// Map { 'a' => 3, 'b' => 2, 'c' => 1 }
```

## Let's Break It Down

- For each item, `counts.get(item) || 0` retrieves the current count (defaulting to `0` if not seen
  yet — the same fallback pattern from earlier JavaScript work), then increments it.
- Both the `.get()` and `.set()` calls are O(1) average case — the entire function runs in O(n)
  overall, one pass through the array, each step doing constant-time work — a genuinely efficient
  solution that a naive nested-loop counting approach wouldn't achieve.

## Common Mistakes

- **Assuming hash table operations are guaranteed O(1) in the absolute worst case**, rather than
  understanding it's an average-case guarantee, contingent on a reasonably well-distributed hash
  function.
- **Not recognizing when a hash-table-based approach (like the "seen" set pattern) could replace an
  O(n²) nested-loop solution.**
- **Using an object/Map with keys that aren't reliably distinguishable** once converted to their
  hashable representation (a common subtlety when using objects as keys, since they get converted
  to a generic string representation, losing their original distinct identity).

## When Should I Use It?

Reach for a hash table (object, `Map`, `Set`, or dictionary) whenever you need fast lookups,
counting, or "have I seen this before" checks — an extremely common, high-value pattern for turning
an O(n²) brute-force approach into an O(n) one.

## Exercises

1. **(Recall)** Why is hash table lookup described as "average-case" O(1) rather than guaranteed
   worst-case O(1)?
2. **(Understanding)** Explain, using this lesson's mechanism, why checking `seen.has(x)` is
   dramatically faster than `array.includes(x)` for a large collection.
3. **(Application)** Write a function that returns the first non-repeating character in a string,
   using a hash table/object to count character occurrences in one pass.

## What Should I Learn Next?

Continue to [`06-trees`](../06-trees) — hierarchical data structures, and the traversal strategies
used to navigate them.
