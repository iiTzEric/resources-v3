// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

 

// Example 1:

// Input: nums = [3,2,3]
// Output: 3
// Example 2:

// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

//  Boyer-Moore Voting

function majorityElement(nums) {
    let candidate = nums[0]
    let votes = 1

    for (let i = 1; i < nums.length; i++) {
        if (votes === 0) {
            candidate = nums[i]
            votes = 1
        } else if (nums[i] === candidate) {
            votes++
        } else if (nums[i] !== candidate) {
            votes--
        }
    }
    return candidate
}

// class Solution(object):
    def majorityElement(self, nums):
        candidate = nums[0]
        votes = 1

        for i in range(1, len(nums)):
            if votes == 0:
                candidate = nums[i]
                votes = 1
            elif nums[i] == candidate:
                votes += 1
            elif nums[i] != candidate:
                votes -= 1
        return candidate        