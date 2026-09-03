# Graphs

**Module:** Data Structures & Algorithms
**Prerequisites:** [`06-trees`](../06-trees)

## What is it?

A **graph** consists of **nodes** (also called vertices) connected by **edges** — more general than
a tree, since graphs allow cycles (a path that loops back on itself) and don't require a single
root or strict hierarchy. Social networks, road maps, and website link structures are all naturally
represented as graphs.

## Why does it matter?

Many real-world relationships aren't hierarchical — "who follows whom" on a social network, "which
cities connect to which," "which web pages link to which" — graphs are the natural structure for
representing and reasoning about these networks.

## How does it work?

### Directed vs. undirected graphs

- **Undirected** — an edge between A and B means the connection goes both ways (Facebook-style
  mutual friendship).
- **Directed** — an edge from A to B is one-way, and doesn't imply a connection from B to A
  (Twitter/X-style following, or a one-way street).

### Representing a graph — adjacency list (the common, practical choice)

```javascript
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"]
};
```

Each key represents a node, and its value is a list of nodes it directly connects to — genuinely
similar in spirit to the `children` array from the Trees topic, except graphs don't require this
structure to be acyclic or hierarchical (`D` connecting back toward `B`, which connects back toward
`A`, forming a cycle, is perfectly valid in a graph, unlike in a tree).

### Traversal — the same core ideas from trees, adapted

**Depth-first search (DFS)**, using a **visited** set to avoid infinite loops from cycles:

```javascript
function dfs(graph, start, visited = new Set()) {
  if (visited.has(start)) return [];
  visited.add(start);
  let result = [start];
  for (const neighbor of graph[start]) {
    result = result.concat(dfs(graph, neighbor, visited));
  }
  return result;
}
```

**Breadth-first search (BFS)**, using a queue exactly as in the Trees topic:

```javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}
```

**Why `visited` is essential here, unlike in a tree**: a tree's structure (each node reachable via
exactly one path from the root, no cycles) means you'd never revisit the same node during
traversal. A graph can have cycles — without tracking visited nodes, `dfs`/`bfs` could loop
infinitely, repeatedly re-visiting the same connected nodes forever.

### BFS finds the shortest path in an unweighted graph

Because BFS explores level by level (all nodes 1 step away, then all nodes 2 steps away, and so
on), the first time it reaches a target node is guaranteed to be via the shortest possible path (in
terms of number of edges) — a genuinely useful, specific property worth knowing, directly relevant
to problems like "shortest number of connections between two people in a social network."

## Simple Example

```javascript
const socialNetwork = {
  Alice: ["Ben", "Carla"],
  Ben: ["Alice", "Diana"],
  Carla: ["Alice"],
  Diana: ["Ben"]
};

console.log(bfs(socialNetwork, "Alice"));
// ["Alice", "Ben", "Carla", "Diana"] -- visits Alice's direct connections
// before Diana, who's 2 steps away
```

## Let's Break It Down

- Starting from `Alice`, BFS first visits her direct connections (`Ben`, `Carla`) before moving on
  to `Diana`, who's only reachable through `Ben` — exactly the level-by-level property that
  guarantees shortest-path discovery.
- The `visited` set prevents `Alice` from being revisited when processing `Ben`'s own connections
  (since `Ben` connects back to `Alice`) — without it, this traversal would loop indefinitely.

## Common Mistakes

- **Forgetting to track visited nodes**, causing infinite loops on any graph containing a cycle.
- **Using DFS when a shortest-path guarantee is actually needed** — DFS explores deeply down one
  path first and doesn't guarantee finding the shortest path first, unlike BFS.
- **Confusing directed and undirected graphs when modeling a real relationship**, misrepresenting
  one-way connections as bidirectional or vice versa.

## When Should I Use It?

Use a graph to represent networks of relationships that aren't strictly hierarchical, and may
contain cycles. Use BFS when you need the shortest path (in an unweighted graph) or level-by-level
processing. Use DFS when you need to explore all reachable nodes and don't specifically need
shortest-path guarantees.

## Exercises

1. **(Recall)** What's the key structural difference between a graph and a tree?
2. **(Understanding)** Explain why a `visited` set is necessary for graph traversal but not
   strictly necessary for tree traversal.
3. **(Application)** Given the `socialNetwork` graph above, trace through BFS to determine the
   shortest number of connections between `Carla` and `Diana`.

## What Should I Learn Next?

Continue to [`08-heaps`](../08-heaps) — a specialized tree-based structure for efficiently finding
the smallest or largest element in a changing collection.
