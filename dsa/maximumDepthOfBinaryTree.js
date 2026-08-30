// Input:  [3,9,20,null,null,15,7]
//          3
//         / \
//        9  20
//          /  \
//         15   7

// Output: 3



class TreeNode {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const root = new TreeNode(3)
root.left = new TreeNode(9)
root.right = new TreeNode(20)
root.right.left = new TreeNode(15)
root.right.right = new TreeNode(7)

console.log(maxDepth(root))  // expect 3
console.log(maxDepth(null))  // expect 0


function maxDepth(root) {
    if (root === null) return 0
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

//python solution
def maxDepth(self, root):
        if root == None:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))