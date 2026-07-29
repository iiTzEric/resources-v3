// Input:  root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true
//           5
//          / \
//         4   8
//        /   / \
//       11  13   4
//      /  \       \
//     7    2        1

// The path 5 → 4 → 11 → 2 adds up to 22 → return true.

// The idea
// At each node, ask: "If I subtract my value from the target, does any path below me sum to the remainder?"
// At node 5, target = 22 → does any path below sum to 22-5=17?
// At node 4, target = 17 → does any path below sum to 17-4=13?
// At node 11, target = 13 → does any path below sum to 13-11=2?
// At node 2, target = 2 → is this a leaf and does 2-2=0? YES!
// Base cases:

// null node → false (no path here)
// Leaf node (no children) AND targetSum === node.val → true

// Recursive case:

// Check left subtree OR right subtree with targetSum - node.val


class TreeNode {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const root = new TreeNode(5)
root.left = new TreeNode(4)
root.right = new TreeNode(8)
root.left.left = new TreeNode(11)
root.left.left.left = new TreeNode(7)
root.left.left.right = new TreeNode(2)
root.right.left = new TreeNode(13)
root.right.right = new TreeNode(4)
root.right.right.right = new TreeNode(1)

console.log(hasPathSum(root, 22)) //true
console.log(hasPathSum(root, 5)) //false


function hasPathSum(root, targetSum) {
    if (root === null) return false // no node here
    if (root.left === null && root.right === null) { // leaf node
        return root.val === targetSum // does it match?
    }
    // check left or right with reduced target
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
}

// python solution
def hasPathSum(self, root, targetSum):
        if root == None:
            return False
        if root.left == None and root.right == None:
            return root.val == targetSum
        return self.hasPathSum(root.left, targetSum - root.val) or self.hasPathSum(root.right, targetSum - root.val)