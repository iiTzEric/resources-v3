DFS means: go as deep as possible before backtracking.

Think of it like exploring a building; 

you go into the first room, then the first door in that room, then the first door in that room... until you hit a dead end. Then you backtrack and try the next door.

The depth of a tree = 1 + the maximum depth of its subtrees

So depth(node) = 1 + max(depth(node.left), depth(node.right))

the base case would be: if (node === null) return 0