// What is a Stack?
// A stack works like a pile of plates — you can only add or remove from the top.

// Push 1 → [1]
// Push 2 → [1, 2]
// Push 3 → [1, 2, 3]
// Pop    → [1, 2]      (removes 3, the last one added)

// This is called LIFO — Last In, First Out.

// In JavaScript, a regular array already works as a stack:
const stack = []
stack.push(1)   // add to top
stack.push(2)
stack.push(3)
stack.pop()      // removes and returns 3

// What is a Queue?
// A queue works like a line at a matatu stage — first person in line is first to board.

// Enqueue 1 → [1]
// Enqueue 2 → [1, 2]
// Enqueue 3 → [1, 2, 3]
// Dequeue   → [2, 3]      (removes 1, the first one added)

// This is called FIFO — First In, First Out.

const queue = []
queue.push(1)      // add to back
queue.push(2)
queue.push(3)
queue.shift()       // removes and returns 1 (the front)