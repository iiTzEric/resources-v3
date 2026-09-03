# Stacks & Queues

**Module:** Data Structures & Algorithms
**Prerequisites:** [`03-linked-lists`](../03-linked-lists)

## What is it?

A **stack** adds and removes elements from only one end, **Last In, First Out (LIFO)**. A **queue**
adds elements at one end and removes them from the other, **First In, First Out (FIFO)**. You've
actually already encountered a real stack directly: the JavaScript call stack, from the Event Loop
topic.

## Why does it matter?

These restricted-access structures show up constantly in real systems — undo history, task
scheduling, breadth-first traversal (covered in the Graphs topic) — precisely because their
restricted access pattern matches how certain real problems naturally work.

## How does it work?

### Stack — Last In, First Out

```javascript
const stack = [];
stack.push(1);   // [1]
stack.push(2);    // [1, 2]
stack.push(3);     // [1, 2, 3]
stack.pop();        // removes and returns 3 -> [1, 2]
```

The last item added is always the first one removed — like a stack of plates, you add to and remove
from the top only. JavaScript arrays' `.push()`/`.pop()` naturally implement stack behavior, both
O(1).

### A real example: the call stack, revisited

Recall from the JavaScript Event Loop topic: function calls are tracked on the **call stack** —
each call pushed on top when it starts, popped off when it returns. This is a genuine, real-world
stack in action, not just a teaching example — it's precisely why a stack trace reads from most-
recent call at the top down to the original call at the bottom.

### Queue — First In, First Out

```javascript
const queue = [];
queue.push(1);    // [1]
queue.push(2);     // [1, 2]
queue.push(3);      // [1, 2, 3]
queue.shift();       // removes and returns 1 -> [2, 3]
```

The first item added is the first one removed — like a real-world line/queue of people, first come,
first served. Note: `.shift()` on a JavaScript array is actually O(n) (every remaining element must
shift position), so for genuinely performance-sensitive queue implementations, a proper linked-list-
based queue (avoiding this O(n) cost) is preferable — worth knowing this practical limitation of
using a plain array as a queue.

### Real use cases

**Stacks**: undo/redo functionality (each action pushed onto a stack; undo pops the most recent
one), the call stack itself, and depth-first traversal of trees/graphs (covered in later topics).

**Queues**: task scheduling (process requests in the order they arrived), breadth-first traversal
of trees/graphs, and any "process in the order received" scenario.

## Simple Example

```javascript
class UndoStack {
  constructor() {
    this.actions = [];
  }

  perform(action) {
    this.actions.push(action);
  }

  undo() {
    return this.actions.pop();
  }
}

const editor = new UndoStack();
editor.perform("typed 'Hello'");
editor.perform("typed ' World'");
console.log(editor.undo()); // "typed ' World'" -- the MOST RECENT action, undone first
```

## Let's Break It Down

- Each action is pushed onto the stack as it happens, in order.
- `undo()` pops the most recently added action — exactly matching real undo behavior: the *last*
  thing you did is the *first* thing undo reverses, a direct, natural fit for LIFO/stack behavior.
- A queue would be the wrong structure here — FIFO would undo the *oldest* action first, which
  isn't how undo is expected to work at all.

## Common Mistakes

- **Confusing LIFO and FIFO**, using the wrong structure for a problem's actual required order.
- **Using `.shift()` on a large JavaScript array for a performance-sensitive queue**, not realizing
  it's O(n), not O(1).
- **Missing that a stack is the natural fit for undo-style behavior**, and a queue is the natural
  fit for order-of-arrival processing — recognizing which pattern a problem calls for is the real
  skill here.

## When Should I Use It?

Use a stack when the most recently added item should be processed/removed first (undo, function
call tracking, depth-first algorithms). Use a queue when items should be processed in the exact
order they arrived (task scheduling, breadth-first algorithms).

## Exercises

1. **(Recall)** What does LIFO stand for, and how does it differ from FIFO?
2. **(Application)** Implement a simple `Queue` class with `enqueue` and `dequeue` methods using a
   JavaScript array.
3. **(Problem Solving)** A print job scheduler needs to process print requests in the exact order
   they were submitted. Which structure fits, and why would using the wrong one (a stack) produce
   incorrect behavior?

## What Should I Learn Next?

Continue to [`05-hash-tables`](../05-hash-tables) — a structure enabling extremely fast lookups,
underlying JavaScript objects and Python dictionaries themselves.
