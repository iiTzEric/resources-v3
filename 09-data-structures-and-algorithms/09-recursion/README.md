# Recursion

**Module:** Data Structures & Algorithms
**Prerequisites:** [`08-heaps`](../08-heaps)

## What is it?

**Recursion** is a function calling itself to solve a smaller version of the same problem, until
reaching a **base case** simple enough to answer directly. You've actually already used recursion
throughout this module — the tree and graph traversal functions in earlier topics were recursive.

## Why does it matter?

Recursion is the natural way to express solutions to problems with a genuinely recursive
structure — trees, certain mathematical definitions, "divide and conquer" algorithms (covered in
Sorting) — often producing dramatically clearer code than an equivalent iterative approach would.

## How does it work?

### The two essential ingredients

```javascript
function factorial(n) {
  if (n <= 1) return 1;        // base case - stops the recursion
  return n * factorial(n - 1); // recursive case - calls itself with a smaller problem
}
```

- **Base case** — the condition where the function returns a direct answer, without recursing
  further. Every recursive function needs at least one, or it recurses forever (eventually
  crashing with a stack overflow, connecting directly back to the call stack concept from the
  Event Loop topic — each recursive call adds another frame to that stack).
- **Recursive case** — the function calls itself with a smaller/simpler version of the original
  problem, trusting that the recursive call will correctly solve that smaller piece.

### Tracing through `factorial(4)`, using the call stack mental model

```
factorial(4)
  -> 4 * factorial(3)
       -> 3 * factorial(2)
            -> 2 * factorial(1)
                 -> returns 1 (base case reached)
            <- returns 2 * 1 = 2
       <- returns 3 * 2 = 6
  <- returns 4 * 6 = 24
```

Each call is pushed onto the call stack, waiting for its recursive call to return before it can
compute its own result — this "unwinding" from the base case back up through each waiting call is
exactly how the final answer gets built.

### Recursion versus iteration — the same problem, two approaches

```javascript
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

Both versions correctly compute the same result. The recursive version often more directly mirrors
the mathematical definition of factorial (`n! = n × (n-1)!`), while the iterative version avoids the
overhead of multiple function calls and the risk of stack overflow on very large inputs — neither is
universally "better"; the choice depends on which more clearly expresses the problem's actual
structure, and whether the input size could realistically cause stack depth issues.

### Why trees and graphs are naturally recursive

Recall the tree traversal functions from earlier topics — a tree is, by nature, defined
recursively: "a tree is a node, with children that are themselves trees." This is precisely why
recursive functions map so naturally onto tree/graph problems — the recursive case directly mirrors
the data structure's own recursive definition.

## Simple Example

```javascript
function sumArray(arr) {
  if (arr.length === 0) return 0;      // base case
  return arr[0] + sumArray(arr.slice(1)); // recursive case
}

console.log(sumArray([1, 2, 3, 4])); // 10
```

## Let's Break It Down

- The base case handles an empty array, returning `0` directly.
- The recursive case takes the first element and adds it to the sum of everything else
  (`arr.slice(1)`, a smaller version of the original problem) — each recursive call works with a
  strictly shorter array, guaranteeing eventual progress toward the base case.
- This mirrors `[1,2,3,4] -> 1 + sum([2,3,4]) -> 1 + (2 + sum([3,4])) -> ...` until reaching the
  empty-array base case, then unwinding back up to produce the final total.

## Common Mistakes

- **Forgetting the base case entirely**, or writing one that's never actually reachable, causing
  infinite recursion and an eventual stack overflow.
- **Not making genuine progress toward the base case** in the recursive call (e.g., calling
  `sumArray(arr)` again with the exact same, unchanged array) — this also causes infinite recursion.
- **Using recursion for problems with very deep recursion depth** (very large inputs) where an
  iterative approach would avoid the real risk of exceeding the call stack's limits.

## When Should I Use It?

Use recursion when a problem has a naturally recursive structure (trees, graphs, certain
mathematical definitions) where it produces clearer, more direct code. Prefer iteration when
recursion depth could realistically become very large, or when the iterative version is
meaningfully clearer for a given problem.

## Exercises

1. **(Recall)** What are the two essential components every recursive function needs?
2. **(Understanding)** Explain, using the call stack mental model, what happens if a recursive
   function's base case is never reached.
3. **(Application)** Write a recursive function to reverse a string.

## What Should I Learn Next?

Continue to [`10-searching`](../10-searching) — searching algorithms, including binary search,
which you've now seen referenced conceptually several times throughout this module.
