// 215. Kth Largest Element in an Array
// Medium
// Topics
// premium lock icon
// Companies
// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

 

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4


function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
}

console.log(findKthLargest([3,2,1,5,6,4], 2))
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))

// python solution
// def find_kth_largest(nums, k):
//     nums.sort(reverse=True)
//     return nums[k - 1]

// print(find_kth_largest([3,2,1,5,6,4], 2))
// print(find_kth_largest([3,2,3,1,2,4,5,5,6], 4))