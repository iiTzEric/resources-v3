# Heaps

**Module:** Data Structures & Algorithms
**Prerequisites:** [`07-graphs`](../07-graphs)

## What is it?

A **heap** is a specialized tree-based structure that efficiently keeps track of the smallest (a
**min-heap**) or largest (a **max-heap**) element in a changing collection, providing O(log n)
insertion and removal, and O(1) access to that smallest/largest element at any time.

## Why does it matter?

Many real problems repeatedly need "give me the current smallest/highest priority item" from a
collection that's constantly changing — task scheduling by priority, finding the k largest elements
in a stream of data — a heap is specifically optimized for exactly this repeated operation, more
efficiently than re-sorting the entire collection every time something changes.

## How does it work?

### The heap property

A **min-heap** maintains one invariant: every parent node's value is less than or equal to both its
children's values (a **max-heap** is the mirror image — parent always greater than or equal to
children). Critically, this is a *weaker* ordering than a fully sorted structure or a BST — a heap
does **not** guarantee that siblings, or nodes further apart in the tree, are in any particular
order relative to each other, only that each parent-child relationship satisfies the heap property.

```
       1
      / \
     3   2
    / \
   5   4
```

Here, `1` (the root) is guaranteed to be the smallest value in the entire structure — but notice `3`
and `2` aren't necessarily ordered relative to each other, and neither are `5` and `4` relative to
`2` — only the parent-child relationships are guaranteed.

### Why this weaker guarantee is actually the point

Because a heap only needs to maintain this weaker, local invariant (rather than a full ordering,
like a BST), it can support insertion and removal-of-the-minimum in **O(log n)** — genuinely more
efficient for this specific repeated task than maintaining a fully sorted structure, and more
efficient than resorting the entire collection (O(n log n)) every single time an element changes.

### Common operations

```javascript
// Conceptual - JavaScript doesn't have a built-in heap; typically use a library or implement one
const heap = new MinHeap();
heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(1);

console.log(heap.peek());   // 1 - the minimum, O(1)
console.log(heap.extractMin()); // removes and returns 1, O(log n)
console.log(heap.peek());    // 3 - the new minimum
```

- **`peek()`** — O(1) — the minimum (or maximum) is always accessible instantly, typically stored
  at the root.
- **`insert()`** — O(log n) — add the new element, then "bubble" it upward as needed to restore the
  heap property.
- **`extractMin()`/`extractMax()`** — O(log n) — remove the root, replace it with an appropriate
  remaining element, then "bubble" it downward as needed to restore the heap property.

### A concrete, practical use case: a priority queue

A **priority queue** processes items by priority rather than strictly by arrival order (unlike the
plain queue from the Stacks & Queues topic) — a heap is the standard, efficient underlying
implementation for this. Real applications: task schedulers processing higher-priority jobs first,
regardless of when they were submitted; Dijkstra's shortest-path algorithm (an advanced graph
algorithm using a heap to always process the currently-nearest unvisited node next).

### Finding the k largest elements — a genuinely common practical problem

Maintaining a small min-heap of size `k` while processing a large stream of data lets you track the
`k` largest elements seen so far in O(n log k) time overall — significantly more efficient than
sorting the *entire* dataset (O(n log n)) just to look at the top `k` elements, especially when `k`
is small relative to the total data size.

## Simple Example

Conceptually tracing a min-heap's behavior as elements are inserted:

```
insert(5) -> [5]
insert(3) -> [3, 5]        (3 is smaller, moves toward the root)
insert(8) -> [3, 5, 8]      (8 stays in place, already satisfies heap property)
insert(1) -> [1, 3, 8, 5]    (1 is smallest, bubbles all the way to the root)

peek() -> 1
extractMin() -> 1, remaining heap reorganizes -> [3, 5, 8]
```

## Let's Break It Down

- Each insertion places the new element appropriately and "bubbles" it toward the root if it's
  smaller than its parent — maintaining the heap property without needing to fully re-sort
  everything.
- `extractMin()` always returns the current smallest value in O(log n), and the heap automatically
  reorganizes to maintain the property afterward — genuinely more efficient than repeatedly sorting
  an array to find and remove its minimum, which would cost O(n log n) per removal.

## Common Mistakes

- **Assuming a heap is fully sorted** — only parent-child relationships are guaranteed; siblings and
  more distant nodes have no guaranteed order relative to each other.
- **Using a heap when you actually need a fully sorted structure** (like needing to access elements
  in strict rank order, not just repeatedly the current min/max) — a heap isn't the right tool for
  that.
- **Reaching for repeated full sorts** to find a running minimum/maximum in changing data, when a
  heap would handle this dramatically more efficiently.

## When Should I Use It?

Use a heap (or a priority queue built on one) whenever you repeatedly need the current smallest or
largest element from a changing collection — task scheduling, finding top-k elements, and certain
graph algorithms (Dijkstra's, covered at an advanced level beyond this introductory topic).

## Exercises

1. **(Recall)** What's the key invariant a min-heap maintains, and what does it *not* guarantee?
2. **(Understanding)** Explain why a heap's weaker ordering guarantee (versus a fully sorted array)
   actually enables more efficient insertion/removal.
3. **(Application)** Describe, in plain language, how you'd use a min-heap of size `k` to
   efficiently track the `k` largest numbers seen so far while processing a very long stream of
   numbers.

## What Should I Learn Next?

Continue to [`09-recursion`](../09-recursion) — functions that call themselves, a technique used
throughout the traversal algorithms in this module.
