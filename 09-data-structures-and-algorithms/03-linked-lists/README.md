# Linked Lists

**Module:** Data Structures & Algorithms
**Prerequisites:** [`02-arrays-and-strings`](../02-arrays-and-strings)

## What is it?

A **linked list** stores a sequence of elements as separate **nodes**, where each node holds its
value plus a reference (a "pointer") to the next node — rather than storing elements contiguously
in memory the way an array does.

## Why does it matter?

Linked lists solve specific problems arrays handle poorly — genuinely efficient insertion/removal
at arbitrary positions — at the cost of losing O(1) indexed access. Understanding this tradeoff is
the actual point of learning this structure, more than the structure itself.

## How does it work?

### The structure

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const a = new Node(1);
const b = new Node(2);
a.next = b; // manually link them
```

Each `Node` holds a value and a reference to the next node in the sequence — the list itself is
just a reference to the first node (the **head**); traversing the list means following `.next`
references one at a time until reaching a node whose `.next` is `null` (the end).

### Why insertion/removal is fast, but access is slow

**Inserting in the middle** — O(1), *once you already have a reference to the right position* —
you just update a couple of `.next` references, no shifting of other elements needed (unlike an
array, where inserting in the middle requires shifting every subsequent element, an O(n)
operation).

**Accessing the nth element** — O(n) — there's no way to jump directly to a specific position; you
must traverse from the head, following `.next` references one at a time, since nodes aren't stored
contiguously in a way that allows direct address calculation the way array indexing does.

This is the core tradeoff versus arrays: **arrays** offer O(1) indexed access but O(n) insertion/
removal in the middle; **linked lists** offer O(1) insertion/removal (given a reference to the
position) but O(n) indexed access.

### Singly vs. doubly linked lists

A **singly** linked list (shown above) only links forward (`.next`). A **doubly** linked list adds
a `.prev` reference too, allowing traversal in both directions — at the cost of additional memory
per node for the extra reference.

### A common, real use case

Genuinely used in scenarios needing frequent insertion/removal at arbitrary positions without the
cost of shifting elements — implementing an undo/redo history, or the underlying structure behind
some queue/deque implementations.

## Simple Example

```javascript
class LinkedList {
  constructor() {
    this.head = null;
  }

  addFirst(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

const list = new LinkedList();
list.addFirst(3);
list.addFirst(2);
list.addFirst(1);
console.log(list.toArray()); // [1, 2, 3]
```

## Let's Break It Down

- `addFirst` creates a new node, points its `.next` at the current head, and updates `head` to be
  this new node — this is genuinely O(1), regardless of how many elements are already in the list,
  since it only ever touches the very front.
- `toArray` traverses the entire list by repeatedly following `.next`, an O(n) operation, needed
  here purely to display the list's contents in a familiar array form.
- Contrast this with inserting at the front of a plain JavaScript array (`array.unshift(value)`) —
  that operation is O(n), since every existing element must shift to make room, exactly the
  tradeoff this lesson describes.

## Common Mistakes

- **Assuming linked lists are a strict, universal upgrade over arrays** — they trade O(1) indexed
  access for O(1) insertion/removal at a known position; neither structure is universally "better."
- **Forgetting to update `.next` references correctly during insertion/removal**, potentially
  breaking the chain and losing access to the rest of the list.
- **Using a linked list when an array's O(1) indexed access is actually what a problem needs most**,
  incurring unnecessary O(n) traversal costs for simple lookups.

## When Should I Use It?

Use a linked list when your access pattern is primarily sequential (processing elements in order)
and you need frequent, efficient insertion/removal at arbitrary positions. Use an array when you
need fast, direct access by index, or when you're primarily appending to/reading from the end.

## Exercises

1. **(Recall)** What's the core tradeoff between arrays and linked lists?
2. **(Application)** Add a `removeFirst()` method to the `LinkedList` class above.
3. **(Problem Solving)** A developer needs to frequently insert elements at random positions in a
   very large collection and rarely needs to access elements by a specific index. Which structure
   (array or linked list) fits better, and why?

## What Should I Learn Next?

Continue to [`04-stacks-and-queues`](../04-stacks-and-queues) — two structures with very specific,
restricted access patterns, each suited to particular real problems.
