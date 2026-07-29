// Sliding Window (advanced)
// You already know the basic sliding window from maxProfit — tracking a minimum and maximum as you move through an array.
// The advanced version uses a window of fixed or variable size that slides through the array, tracking something about the elements inside it.
// Think of it like a magnifying glass sliding across the array — you only look at a small section at a time.

Input:  nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75

Input:  nums = [5], k = 1
Output: 5.0

// Find the contiguous subarray of length k that has the maximum average.

function findMaxAverage(nums, k) {
    let windowSum = 0

    for (let i = 0; i < k; i++) {
        windowSum += nums[i]
    }
    let maxSum = windowSum // first window is best so far
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i] // add new element on the right
        windowSum -= nums[i - k] // remove element that fell off the left
        maxSum = Math.max(maxSum, windowSum) // track best
    }
    return maxSum / k
}

console.log(findMaxAverage([1,12,-5,-6,50,3], 4)) //12.75
console.log(findMaxAverage([5], 1)) // 5.0

// python Solution
class Solution(object):
    def findMaxAverage(self, nums, k):
        window_sum = 0
        for i in range(k):
            window_sum += nums[i]
        max_sum = window_sum
        for i in range(k, len(nums)):
            window_sum += nums[i]
            window_sum -= nums[i - k]
            max_sum = max(max_sum, window_sum)
        return float(max_sum) / k