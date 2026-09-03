# Trees

**Module:** Data Structures & Algorithms
**Prerequisites:** [`05-hash-tables`](../05-hash-tables)

## What is it?

A **tree** is a hierarchical data structure made of nodes, where each node has a value and
references to **child** nodes, starting from a single **root** node. You've already encountered a
real tree throughout this curriculum: **the DOM itself is a tree** — every HTML element is a node,
nested inside parent elements, all descending from a single root document.

## Why does it matter?

Trees naturally represent hierarchical relationships — file systems, organizational structures, the
DOM, and (in the Backend module) nested category structures. Understanding tree traversal
specifically is essential groundwork for graphs (the next topic) and for genuinely understanding how
the DOM itself is structured and navigated.

## How does it work?

### Basic structure

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

const root = new TreeNode("CEO");
const vp1 = new TreeNode("VP Engineering");
const vp2 = new TreeNode("VP Sales");
root.children.push(vp1, vp2);
```

Each node can have any number of children (a general tree) — a **binary tree** specifically
restricts each node to at most two children, commonly labeled `left` and `right`.

### Binary Search Trees (BSTs) — a specific, useful kind of binary tree

```javascript
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

A BST maintains a specific ordering invariant: for any node, every value in its **left** subtree is
smaller, and every value in its **right** subtree is larger. This ordering is precisely what enables
efficient **O(log n)** average-case search — at each node, you can eliminate an entire half of the
remaining tree by comparing against the current node's value, directly analogous to binary search
on a sorted array.

```javascript
function search(node, target) {
  if (node === null) return false;
  if (node.value === target) return true;
  if (target < node.value) return search(node.left, target);
  return search(node.right, target);
}
```

### Tree traversal — visiting every node

**Depth-first traversal** — go as deep as possible down one path before backtracking:

```javascript
function depthFirst(node, result = []) {
  if (node === null) return result;
  result.push(node.value);
  for (const child of node.children) {
    depthFirst(child, result);
  }
  return result;
}
```

**Breadth-first traversal** — visit all nodes at the current depth before moving to the next level,
using a **queue** (directly connecting back to the previous topic):

```javascript
function breadthFirst(root) {
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);
    queue.push(...node.children);
  }
  return result;
}
```

Notice the queue's FIFO behavior here is exactly what ensures nodes are visited level by level,
rather than plunging deep down one branch first — a direct, concrete application of the stacks/
queues topic.

### A genuinely relevant connection: the DOM as a tree

`document.querySelectorAll(...)`, event bubbling (from the JavaScript DOM topic), and the entire
structure of a webpage are all built on this exact tree concept — a parent element containing child
elements, potentially many levels deep, exactly matching the `TreeNode` structure shown here.

## Simple Example

```javascript
function height(node) {
  if (node === null) return 0;
  const childHeights = node.children.map(height);
  return 1 + Math.max(0, ...childHeights);
}
```

## Let's Break It Down

- This recursively calculates a tree's height (the longest path from root to any leaf).
- For a node with no children (`node.children` is empty), `Math.max(0, ...[])` correctly evaluates
  to `0`, so the function returns `1` (just this node itself).
- For a node with children, it recursively computes each child's height, then returns `1` plus the
  tallest of them — this recursive structure (a node's answer built from its children's answers) is
  a genuinely common shape for tree problems.

## Common Mistakes

- **Confusing depth-first and breadth-first traversal**, using the wrong one for a problem that
  specifically needs level-by-level processing (breadth-first) or needs to explore one path fully
  before others (depth-first).
- **Forgetting the BST ordering invariant must be maintained on every insertion**, or the O(log n)
  search efficiency guarantee breaks down.
- **Not handling the `null`/empty base case in recursive tree functions**, causing errors when
  reaching the end of a branch.

## When Should I Use It?

Use a tree to represent genuinely hierarchical data (file systems, organizational structures,
nested categories). Use a BST specifically when you need efficient, ordered search/insertion.
Choose depth-first traversal for exploring paths fully; breadth-first for level-by-level processing
or finding the shortest path in unweighted structures.

## Exercises

1. **(Recall)** What ordering invariant must every node in a Binary Search Tree satisfy?
2. **(Application)** Write a function that counts the total number of nodes in a general tree
   (using the `children` array structure from this lesson).
3. **(Problem Solving)** You need to find the shortest path between two nodes in an unweighted
   tree-like structure. Would depth-first or breadth-first traversal naturally find the shortest
   path first, and why?

## What Should I Learn Next?

Continue to [`07-graphs`](../07-graphs) — a more general structure than trees, representing
networks of connections that aren't necessarily strictly hierarchical.
